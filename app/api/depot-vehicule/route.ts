import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { vehicleDepositSchema } from '@/lib/validations';

export const runtime = 'nodejs';

function clean(value?: string) {
  return value && value.trim() !== '' ? value : 'Non renseigné';
}

const offerLabels: Record<string, string> = {
  essentiel: 'Essentiel — 39€ HT',
  pro: 'Pro — 89€ HT',
  concession: 'Concession — sur devis'
};

function getOffer(json: unknown): string {
  if (
    typeof json === 'object' &&
    json !== null &&
    'offer' in json &&
    typeof (json as { offer?: unknown }).offer === 'string'
  ) {
    const offer = (json as { offer: string }).offer;
    return offerLabels[offer] || offer;
  }

  return 'Non renseignée';
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const selectedOffer = getOffer(json);

    const parsed = vehicleDepositSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation invalide',
          details: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const recipient = process.env.MAIL_TO;

    if (!recipient) {
      return NextResponse.json(
        { error: 'Configuration email incomplète.' },
        { status: 500 }
      );
    }

    const uploadedFiles = data.uploadedFiles ?? [];
    const dealership = clean(data.dealership || data.garageName || data.company);
    const style = clean(data.requestedStyle || data.style);

    const photosText =
      uploadedFiles.length > 0
        ? uploadedFiles.map((file, index) => `${index + 1}. ${file.name} — ${file.url}`).join('\n')
        : 'Aucune photo transmise.';

    const photosHtml =
      uploadedFiles.length > 0
        ? uploadedFiles
            .map(
              (file, index) =>
                `<li style="margin:0 0 8px 0;color:#374151;"><a href="${file.url}" target="_blank" rel="noreferrer" style="color:#2563eb;text-decoration:underline;">Photo ${index + 1} — ${file.name}</a></li>`
            )
            .join('')
        : '<li style="margin:0;color:#374151;">Aucune photo transmise.</li>';

    const adminText = `
Nouveau dépôt véhicule Qlyk Studio Auto

Offre sélectionnée : ${selectedOffer}

Nom : ${data.firstName} ${data.lastName}
Email : ${data.email}
Téléphone : ${clean(data.phone)}
Concession : ${dealership}

Type véhicule : ${clean(data.vehicleType)}
Marque / modèle : ${data.brandModel}
Année : ${clean(data.year)}
Objectif : ${clean(data.objective)}
Style souhaité : ${style}

Photos transmises :
${photosText}

Message :
${clean(data.message)}
`;

    const clientText = `
Bonjour ${data.firstName},

Votre dépôt véhicule a bien été reçu.

Offre sélectionnée : ${selectedOffer}
Véhicule : ${data.brandModel}

Nous analysons vos photos et revenons vers vous rapidement avec la suite.

Qlyk Studio Auto
Studio visuel automobile premium
`;

    await sendMail({
      to: recipient,
      subject: `Nouveau dépôt véhicule — ${data.brandModel}`,
      text: adminText,
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
                Un client vient de déposer un véhicule depuis le site.
              </p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-bottom:18px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#111111;">
                <strong>Offre sélectionnée :</strong>
                <span style="color:#2563eb;font-weight:700;">${selectedOffer}</span>
              </p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-bottom:18px;">
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Nom :</strong> ${data.firstName} ${data.lastName}</p>
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Email :</strong> ${data.email}</p>
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Téléphone :</strong> ${clean(data.phone)}</p>
              <p style="margin:0;color:#374151;"><strong style="color:#111111;">Concession :</strong> ${dealership}</p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-bottom:18px;">
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Type :</strong> ${clean(data.vehicleType)}</p>
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Marque / modèle :</strong> ${data.brandModel}</p>
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Année :</strong> ${clean(data.year)}</p>
              <p style="margin:0 0 10px 0;color:#374151;"><strong style="color:#111111;">Objectif :</strong> ${clean(data.objective)}</p>
              <p style="margin:0;color:#374151;"><strong style="color:#111111;">Style :</strong> ${style}</p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-bottom:18px;">
              <p style="margin:0 0 12px 0;color:#111111;">
                <strong>Photos transmises :</strong>
              </p>
              <ul style="margin:0;padding-left:20px;color:#374151;">
                ${photosHtml}
              </ul>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:20px;">
              <p style="margin:0 0 12px 0;color:#111111;">
                <strong>Message :</strong>
              </p>
              <p style="margin:0;font-size:14px;line-height:1.8;color:#374151;">
                ${clean(data.message)}
              </p>
            </div>

            <p style="margin:28px 0 0 0;font-size:12px;line-height:1.6;color:#6b7280;text-align:center;">
              Qlyk Studio Auto — Notification automatique
            </p>
          </div>
        </div>
      `
    });

    await sendMail({
      to: data.email,
      subject: 'Qlyk Studio Auto — Dépôt véhicule reçu',
      text: clientText,
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
              Studio visuel automobile premium
            </p>

            <div style="background:#111;padding:24px;border-radius:14px;">
              <p>Bonjour ${data.firstName},</p>

              <p>
                Votre dépôt véhicule concernant l’offre
                <strong style="color:#3b82f6;">${selectedOffer}</strong>
                a bien été reçu.
              </p>

              <p>
                Nous analysons vos photos afin de préparer une mise en valeur professionnelle,
                réaliste et adaptée à votre véhicule.
              </p>

              <p>
                Nous revenons vers vous rapidement avec la suite du traitement.
              </p>
            </div>

            <div style="margin-top:22px;background:#111;padding:20px;border-radius:14px;">
              <p><strong>Véhicule :</strong> ${data.brandModel}</p>
              <p><strong>Style souhaité :</strong> ${style}</p>
            </div>

            <p style="margin-top:28px;">
              À très bientôt,<br />
              <strong>Qlyk Studio Auto</strong><br />
              <span style="color:#888;">Studio visuel automobile premium</span>
            </p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DEPOT VEHICULE ERROR:', error);

    return NextResponse.json(
      { error: 'Service indisponible, veuillez réessayer.' },
      { status: 500 }
    );
  }
}
