import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type UploadedFile = {
  name?: string;
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

    const recipient = process.env.MAIL_TO;

    if (!recipient) {
      return NextResponse.json(
        { error: "Configuration email incomplète." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const uploadedFiles: UploadedFile[] = Array.isArray(body.uploadedFiles)
      ? body.uploadedFiles
      : [];

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: "Aucune photo envoyée." },
        { status: 400 }
      );
    }

    const depositPayload = {
      first_name: body.firstName || "",
      last_name: body.lastName || "",
      email: body.email || "",
      phone: body.phone || "",
      dealership: body.dealership || "",
      vehicle_type: body.vehicleType || "",
      brand_model: body.brandModel || "",
      year: body.year || "",
      objective: body.objective || "",
      requested_style: body.requestedStyle || "",
      message: body.message || "",
      offer: body.offer || "essentiel",
    };

    const depositResponse = await fetch(
      `${supabaseUrl}/rest/v1/qlyk_vehicle_deposits`,
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
        { error: `Erreur dépôt Supabase : ${depositText}` },
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
      `${supabaseUrl}/rest/v1/qlyk_vehicle_deposit_photos`,
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
        { error: `Erreur photos Supabase : ${photosText}` },
        { status: 500 }
      );
    }

    const photosText = uploadedFiles
      .map((file, index) => `${index + 1}. ${file.name || "Photo"} — ${file.url}`)
      .join("\n");

    const photosHtml = uploadedFiles
      .map(
        (file, index) =>
          `<li style="margin:0 0 8px 0;color:#374151;">
            <a href="${file.url}" target="_blank" rel="noreferrer" style="color:#2563eb;text-decoration:underline;">
              Photo ${index + 1} — ${file.name || "Photo véhicule"}
            </a>
          </li>`
      )
      .join("");

    await sendMail({
      to: recipient,
      subject: `QLYK — Nouveau dépôt véhicule — ${clean(body.brandModel)}`,
      text: `
Nouveau dépôt véhicule Qlyk Studio Auto

Prénom : ${clean(body.firstName)}
Nom : ${clean(body.lastName)}
Email : ${clean(body.email)}
Téléphone : ${clean(body.phone)}
Concession : ${clean(body.dealership)}

Véhicule : ${clean(body.brandModel)}
Type : ${clean(body.vehicleType)}
Année : ${clean(body.year)}
Offre : ${clean(body.offer)}
Objectif : ${clean(body.objective)}
Style demandé : ${clean(body.requestedStyle)}

Photos transmises :
${photosText}

Message :
${clean(body.message)}
`,
      html: `
        <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111111;">
          <div style="max-width:620px;margin:0 auto;padding:30px 20px;">
            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin-bottom:18px;">
              <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#2563eb;margin:0 0 8px 0;">
                Qlyk Studio Auto
              </p>
              <h2 style="margin:0;font-size:24px;line-height:1.3;color:#111111;">
                Nouveau dépôt véhicule
              </h2>
              <p style="margin:12px 0 0 0;font-size:14px;line-height:1.7;color:#4b5563;">
                Une nouvelle commande véhicule vient d’être transmise depuis le site.
              </p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-bottom:18px;">
              <p><strong>Prénom :</strong> ${clean(body.firstName)}</p>
              <p><strong>Nom :</strong> ${clean(body.lastName)}</p>
              <p><strong>Email :</strong> ${clean(body.email)}</p>
              <p><strong>Téléphone :</strong> ${clean(body.phone)}</p>
              <p><strong>Concession :</strong> ${clean(body.dealership)}</p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-bottom:18px;">
              <p><strong>Véhicule :</strong> ${clean(body.brandModel)}</p>
              <p><strong>Type :</strong> ${clean(body.vehicleType)}</p>
              <p><strong>Année :</strong> ${clean(body.year)}</p>
              <p><strong>Offre :</strong> ${clean(body.offer)}</p>
              <p><strong>Objectif :</strong> ${clean(body.objective)}</p>
              <p><strong>Style demandé :</strong> ${clean(body.requestedStyle)}</p>
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
                ${clean(body.message)}
              </p>
            </div>

            <p style="margin:28px 0 0 0;font-size:12px;line-height:1.6;color:#6b7280;text-align:center;">
              Qlyk Studio Auto — Notification automatique
            </p>
          </div>
        </div>
      `,
    });

    if (body.email) {
      await sendMail({
        to: body.email,
        subject: "Qlyk Studio Auto — Dépôt véhicule reçu",
        text: `
Bonjour ${clean(body.firstName)},

Votre dépôt véhicule a bien été reçu.

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
                Votre dépôt véhicule a bien été reçu
              </h1>

              <p style="color:#999;margin-bottom:28px;">
                ${uploadedFiles.length} photo(s) transmise(s)
              </p>

              <div style="background:#111;padding:24px;border-radius:14px;">
                <p>Bonjour ${clean(body.firstName)},</p>
                <p>Votre dépôt véhicule a bien été reçu.</p>
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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DEPOT VEHICULE ERROR:", error);

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
