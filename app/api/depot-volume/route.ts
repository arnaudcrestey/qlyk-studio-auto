import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type UploadedFile = {
  name: string;
  url: string;
  size?: number;
};

function clean(value?: string) {
  return value && value.trim() !== "" ? value : "Non renseigné";
}

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Variables Supabase manquantes." },
        { status: 500 }
      );
    }

    const data = await request.json();

    const recipient = process.env.MAIL_TO;

    if (!recipient) {
      return NextResponse.json(
        { error: "Configuration email incomplète." },
        { status: 500 }
      );
    }

    const uploadedFiles: UploadedFile[] = Array.isArray(data.uploadedFiles)
      ? data.uploadedFiles
      : [];

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: "Aucune photo transmise." },
        { status: 400 }
      );
    }

    const depositPayload = {
      company: data.company || "",
      email: data.email || "",
      phone: data.phone || "",
      vehicle_count: data.vehicleCount || "",
      message: data.message || "",
    };

    const depositResponse = await fetch(
      `${supabaseUrl}/rest/v1/qlyk_volume_deposits`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(depositPayload),
      }
    );

    const depositText = await depositResponse.text();

    if (!depositResponse.ok) {
      return NextResponse.json(
        { error: `Erreur dépôt volume Supabase : ${depositText}` },
        { status: 500 }
      );
    }

    const deposit = JSON.parse(depositText)[0];

    const photosPayload = uploadedFiles.map((file, index) => ({
      deposit_id: deposit.id,
      photo_url: file.url,
      file_name: file.name || "",
      file_size: file.size || 0,
      position: index,
    }));

    const photosResponse = await fetch(
      `${supabaseUrl}/rest/v1/qlyk_volume_deposit_photos`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photosPayload),
      }
    );

    if (!photosResponse.ok) {
      const photosText = await photosResponse.text();

      return NextResponse.json(
        { error: `Erreur photos volume Supabase : ${photosText}` },
        { status: 500 }
      );
    }

    const photosText = uploadedFiles
      .map((file, index) => `${index + 1}. ${file.name} — ${file.url}`)
      .join("\n");

    const photosHtml = uploadedFiles
      .map(
        (file, index) =>
          `<li style="margin:0 0 8px 0;color:#374151;"><a href="${file.url}" target="_blank" rel="noreferrer" style="color:#2563eb;text-decoration:underline;">Photo ${index + 1} — ${file.name}</a></li>`
      )
      .join("");

    await sendMail({
      to: recipient,
      subject: `QLYK — Nouveau dépôt volume — ${clean(data.company)}`,
      text: `
Nouveau dépôt volume Qlyk Studio Auto

Société : ${clean(data.company)}
Email : ${clean(data.email)}
Téléphone : ${clean(data.phone)}
Nombre de véhicules : ${clean(data.vehicleCount)}

Photos transmises :
${photosText}

Message :
${clean(data.message)}
`,
      html: `
        <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111111;">
          <div style="max-width:620px;margin:0 auto;padding:30px 20px;">
            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin-bottom:18px;">
              <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#2563eb;margin:0 0 8px 0;">
                Qlyk Studio Auto
              </p>
              <h2 style="margin:0;font-size:24px;line-height:1.3;color:#111111;">
                Nouveau dépôt volume
              </h2>
              <p style="margin:12px 0 0 0;font-size:14px;line-height:1.7;color:#4b5563;">
                Un dépôt multi-véhicules vient d’être transmis depuis le site.
              </p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-bottom:18px;">
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Société :</strong> ${clean(data.company)}</p>
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Email :</strong> ${clean(data.email)}</p>
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Téléphone :</strong> ${clean(data.phone)}</p>
              <p style="margin:0;color:#374151;"><strong style="color:#111111;">Nombre de véhicules :</strong> ${clean(data.vehicleCount)}</p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-bottom:18px;">
              <p style="margin:0 0 12px 0;color:#111111;"><strong>Photos transmises :</strong></p>
              <ul style="margin:0;padding-left:20px;color:#374151;">
                ${photosHtml}
              </ul>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;">
              <p style="margin:0 0 12px 0;color:#111111;"><strong>Message :</strong></p>
              <p style="margin:0;font-size:14px;line-height:1.8;color:#374151;">
                ${clean(data.message)}
              </p>
            </div>

            <p style="margin:28px 0 0 0;font-size:12px;line-height:1.6;color:#6b7280;text-align:center;">
              Qlyk Studio Auto — Notification automatique
            </p>
          </div>
        </div>
      `,
    });

    await sendMail({
      to: data.email,
      subject: "Qlyk Studio Auto — Dépôt volume reçu",
      text: `
Bonjour,

Votre dépôt volume a bien été reçu.

Nombre de photos transmises : ${uploadedFiles.length}

Nous vérifions vos visuels et revenons vers vous avec la suite du traitement.

Qlyk Studio Auto
Studio visuel automobile premium
`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#050505;color:#ffffff;padding:30px;">
          <div style="max-width:620px;margin:auto;">
            <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#3b82f6;margin:0 0 8px;">
              Qlyk Studio Auto
            </p>

            <h1 style="margin:0 0 12px;font-size:26px;">
              Votre dépôt volume a bien été reçu
            </h1>

            <p style="color:#999;margin-bottom:28px;">
              ${uploadedFiles.length} photo(s) transmise(s)
            </p>

            <div style="background:#111;padding:24px;border-radius:14px;">
              <p>Bonjour,</p>
              <p>Votre dépôt multi-véhicules a bien été reçu.</p>
              <p>Nous vérifions les visuels transmis et revenons vers vous avec la suite du traitement.</p>
            </div>

            <p style="margin-top:28px;">
              À très bientôt,<br />
              <strong>Qlyk Studio Auto</strong><br />
              <span style="color:#888;">Studio visuel automobile premium</span>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DEPOT VOLUME ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Service indisponible, veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}
