import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { vehicleDepositSchema } from '@/lib/validations';

export const runtime = 'nodejs';

function clean(value?: string) {
  return value && value.trim() !== '' ? value : 'Non renseigné';
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const parsed = vehicleDepositSchema.safeParse(json);

    if (!parsed.success) {
      console.error('VALIDATION ERROR:', parsed.error.flatten().fieldErrors);

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
      console.error('MAIL_TO manquant');

      return NextResponse.json(
        { error: 'Configuration email incomplète.' },
        { status: 500 }
      );
    }

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
                `<li><a href="${file.url}" target="_blank" rel="noreferrer">Photo ${index + 1} — ${file.name}</a></li>`
            )
            .join('')
        : '<li>Aucune photo transmise.</li>';

    await sendMail({
      to: recipient,
      subject: `Nouveau dépôt véhicule — ${data.brandModel}`,
      text: [
        `Nom: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        `Téléphone: ${clean(data.phone)}`,
        `Concession: ${clean(data.dealership || data.garageName || data.company)}`,
        `Type véhicule: ${clean(data.vehicleType)}`,
        `Marque / modèle: ${data.brandModel}`,
        `Année: ${clean(data.year)}`,
        `Objectif: ${clean(data.objective)}`,
        `Style souhaité: ${clean(data.requestedStyle || data.style)}`,
        '',
        'Photos transmises:',
        photosText,
        '',
        'Message:',
        clean(data.message)
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Nouveau dépôt véhicule</h2>

          <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${clean(data.phone)}</p>
          <p><strong>Concession :</strong> ${clean(data.dealership || data.garageName || data.company)}</p>
          <p><strong>Type :</strong> ${clean(data.vehicleType)}</p>
          <p><strong>Marque / modèle :</strong> ${data.brandModel}</p>
          <p><strong>Année :</strong> ${clean(data.year)}</p>
          <p><strong>Objectif :</strong> ${clean(data.objective)}</p>
          <p><strong>Style :</strong> ${clean(data.requestedStyle || data.style)}</p>

          <p><strong>Photos transmises :</strong></p>
          <ul>${photosHtml}</ul>

          <p><strong>Message :</strong></p>
          <p>${clean(data.message)}</p>
        </div>
      `
    });

    await sendMail({
      to: data.email,
      subject: 'Qlyk Studio Auto — Dépôt véhicule reçu',
      text:
        'Votre dépôt véhicule a bien été reçu. Nous revenons vers vous rapidement avec les prochaines indications.',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <p>Votre dépôt véhicule a bien été reçu.</p>
          <p>Nous revenons vers vous rapidement avec les prochaines indications.</p>
          <p>—<br/>Qlyk Studio Auto</p>
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
