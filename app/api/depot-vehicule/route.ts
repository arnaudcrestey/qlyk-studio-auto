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

export async function POST(request: Request) {
  try {
    const json = await request.json();
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

    const selectedOffer = data.offer
      ? offerLabels[data.offer] || data.offer
      : 'Non renseignée';

    const uploadedFiles = data.uploadedFiles ?? [];

    const photosText =
      uploadedFiles.length > 0
        ? uploadedFiles
            .map((file, index) => `${index + 1}. ${file.name} — ${file.url}`)
            .join('\n')
        : 'Aucune photo transmise.';

    const photosHtml =
      uploadedFiles.length > 0
        ? uploadedFiles
            .map(
              (file, index) =>
                `<li style="margin-bottom:6px;">
                  <a href="${file.url}" target="_blank" style="color:#3b82f6;text-decoration:none;">
                    Photo ${index + 1} — ${file.name}
                  </a>
                </li>`
            )
            .join('')
        : '<li>Aucune photo transmise.</li>';

    /**
     * EMAIL ADMIN (PROPRE + COMPLET)
     */
    await sendMail({
      to: recipient,
      subject: `🚗 Nouveau dépôt — ${data.brandModel}`,
      text: [
        `Offre: ${selectedOffer}`,
        '',
        `Nom: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        `Téléphone: ${clean(data.phone)}`,
        `Concession: ${clean(data.dealership || data.garageName || data.company)}`,
        '',
        `Type véhicule: ${clean(data.vehicleType)}`,
        `Marque / modèle: ${data.brandModel}`,
        `Année: ${clean(data.year)}`,
        `Objectif: ${clean(data.objective)}`,
        `Style souhaité: ${clean(data.requestedStyle || data.style)}`,
        '',
        'Photos:',
        photosText,
        '',
        'Message:',
        clean(data.message)
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; background:#050505; color:#fff; padding:30px;">
          <div style="max-width:600px;margin:auto;">

            <h2 style="margin-bottom:20px;">🚗 Nouveau dépôt véhicule</h2>

            <div style="background:#111;padding:20px;border-radius:10px;margin-bottom:20px;">
              <p><strong>Offre :</strong> <span style="color:#3b82f6;">${selectedOffer}</span></p>
            </div>

            <div style="background:#111;padding:20px;border-radius:10px;margin-bottom:20px;">
              <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
              <p><strong>Email :</strong> ${data.email}</p>
              <p><strong>Téléphone :</strong> ${clean(data.phone)}</p>
              <p><strong>Concession :</strong> ${clean(data.dealership || data.garageName || data.company)}</p>
            </div>

            <div style="background:#111;padding:20px;border-radius:10px;margin-bottom:20px;">
              <p><strong>Type :</strong> ${clean(data.vehicleType)}</p>
              <p><strong>Marque / modèle :</strong> ${data.brandModel}</p>
              <p><strong>Année :</strong> ${clean(data.year)}</p>
              <p><strong>Objectif :</strong> ${clean(data.objective)}</p>
              <p><strong>Style :</strong> ${clean(data.requestedStyle || data.style)}</p>
            </div>

            <div style="background:#111;padding:20px;border-radius:10px;margin-bottom:20px;">
              <p><strong>Photos :</strong></p>
              <ul>${photosHtml}</ul>
            </div>

            <div style="background:#111;padding:20px;border-radius:10px;">
              <p><strong>Message :</strong></p>
              <p>${clean(data.message)}</p>
            </div>

            <p style="margin-top:30px;font-size:12px;color:#777;">
              Qlyk Studio Auto — Notification automatique
            </p>

          </div>
        </div>
      `
    });

    /**
     * EMAIL CLIENT (PREMIUM)
     */
    await sendMail({
      to: data.email,
      subject: 'Qlyk Studio Auto — Dépôt véhicule reçu',
      text: `
Bonjour ${data.firstName},

Votre dépôt véhicule a bien été reçu.

Offre sélectionnée : ${selectedOffer}
Véhicule : ${data.brandModel}

Nous analysons votre demande et revenons vers vous rapidement.

Qlyk Studio Auto
      `,
      html: `
        <div style="font-family: Arial, sans-serif; background:#050505; color:#fff; padding:30px;">
          <div style="max-width:600px;margin:auto;">

            <h1 style="margin-bottom:10px;">Qlyk Studio Auto</h1>
            <p style="color:#888;margin-bottom:30px;">Studio visuel automobile premium</p>

            <p>Bonjour ${data.firstName},</p>

            <p>Votre dépôt véhicule a bien été reçu.</p>

            <p>
              Offre sélectionnée : 
              <strong style="color:#3b82f6;">${selectedOffer}</strong>
            </p>

            <p>
              Véhicule : <strong>${data.brandModel}</strong>
            </p>

            <p>
              Nous analysons vos photos et revenons vers vous rapidement avec la suite.
            </p>

            <div style="margin:30px 0;padding:20px;background:#111;border-radius:10px;">
              <p style="margin:0;color:#ccc;">
                ⚡ Traitement rapide<br/>
                🚗 Aucun modification du véhicule<br/>
                📩 Suivi personnalisé
              </p>
            </div>

            <p>À très bientôt,</p>

            <p>
              <strong>Qlyk Studio Auto</strong><br/>
              Studio visuel automobile premium
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
