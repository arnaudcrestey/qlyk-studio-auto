import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { vehicleDepositSchema } from '@/lib/validations';

type UploadedFile = {
  name: string;
  url: string;
  size?: number;
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
        { error: 'MAIL_TO manquant dans la configuration.' },
        { status: 500 }
      );
    }

    const uploadedFiles = (json.uploadedFiles ?? []) as UploadedFile[];

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
        `Téléphone: ${data.phone}`,
        `Concession: ${data.dealership}`,
        `Type véhicule: ${data.vehicleType}`,
        `Marque / modèle: ${data.brandModel}`,
        `Année: ${data.year}`,
        `Objectif: ${data.objective}`,
        `Style souhaité: ${data.requestedStyle}`,
        '',
        'Photos transmises:',
        photosText,
        '',
        'Message:',
        data.message
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <p><strong>Nouveau dépôt véhicule</strong></p>
          <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.phone}</p>
          <p><strong>Concession :</strong> ${data.dealership}</p>
          <p><strong>Type :</strong> ${data.vehicleType}</p>
          <p><strong>Marque / modèle :</strong> ${data.brandModel}</p>
          <p><strong>Année :</strong> ${data.year}</p>
          <p><strong>Objectif :</strong> ${data.objective}</p>
          <p><strong>Style :</strong> ${data.requestedStyle}</p>
          <p><strong>Photos transmises :</strong></p>
          <ul>${photosHtml}</ul>
          <p><strong>Message :</strong></p>
          <p>${data.message}</p>
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
    const message = error instanceof Error ? error.message : 'Erreur interne';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
