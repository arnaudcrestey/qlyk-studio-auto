import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';

export const runtime = 'nodejs';

type UploadedFile = {
  name: string;
  url: string;
  size?: number;
};

function clean(value?: string) {
  return value && value.trim() !== '' ? value : 'Non renseigné';
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const recipient = process.env.MAIL_TO;

    if (!recipient) {
      return NextResponse.json(
        { error: 'Configuration email incomplète.' },
        { status: 500 }
      );
    }

    const uploadedFiles: UploadedFile[] = data.uploadedFiles ?? [];

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: 'Aucune photo transmise.' },
        { status: 400 }
      );
    }

    const photosText = uploadedFiles
      .map((file, index) => `${index + 1}. ${file.name} — ${file.url}`)
      .join('\n');

    const photosHtml = uploadedFiles
      .map(
        (file, index) =>
          `<li><a href="${file.url}" target="_blank" rel="noreferrer">Photo ${index + 1} — ${file.name}</a></li>`
      )
      .join('');

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
        <div style="font-family:Arial,sans-serif;background:#050505;color:#ffffff;padding:30px;">
          <div style="max-width:620px;margin:auto;">
            <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#3b82f6;margin:0 0 8px;">
              Qlyk Studio Auto
            </p>

            <h2 style="margin:0 0 24px;font-size:24px;">
              Nouveau dépôt volume
            </h2>

            <div style="background:#111;padding:20px;border-radius:12px;margin-bottom:18px;">
              <p><strong>Société :</strong> ${clean(data.company)}</p>
              <p><strong>Email :</strong> ${clean(data.email)}</p>
              <p><strong>Téléphone :</strong> ${clean(data.phone)}</p>
              <p><strong>Nombre de véhicules :</strong> ${clean(data.vehicleCount)}</p>
            </div>

            <div style="background:#111;padding:20px;border-radius:12px;margin-bottom:18px;">
              <p><strong>Photos transmises :</strong></p>
              <ul>${photosHtml}</ul>
            </div>

            <div style="background:#111;padding:20px;border-radius:12px;">
              <p><strong>Message :</strong></p>
              <p>${clean(data.message)}</p>
            </div>

            <p style="margin-top:28px;font-size:12px;color:#777;">
              Qlyk Studio Auto — Notification automatique
            </p>
          </div>
        </div>
      `,
    });

    await sendMail({
      to: data.email,
      subject: 'Qlyk Studio Auto — Dépôt volume reçu',
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

              <p>
                Votre dépôt multi-véhicules a bien été reçu.
              </p>

              <p>
                Nous vérifions les visuels transmis et revenons vers vous avec la suite du traitement.
              </p>
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
    console.error('DEPOT VOLUME ERROR:', error);

    return NextResponse.json(
      { error: 'Service indisponible, veuillez réessayer.' },
      { status: 500 }
    );
  }
}
