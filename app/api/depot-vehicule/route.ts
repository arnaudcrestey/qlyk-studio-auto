import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { vehicleDepositSchema } from '@/lib/validations';

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
      return NextResponse.json({ error: 'MAIL_TO manquant dans la configuration.' }, { status: 500 });
    }

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
        `Lien photos: ${data.photosLink}`,
        '',
        data.message
      ].join('\n'),
      html: `<p><strong>Nouveau dépôt véhicule</strong></p><p>${data.firstName} ${data.lastName}</p><p>Email: ${data.email}</p><p>Téléphone: ${data.phone}</p><p>Concession: ${data.dealership}</p><p>Type: ${data.vehicleType}</p><p>Marque / modèle: ${data.brandModel}</p><p>Année: ${data.year}</p><p>Objectif: ${data.objective}</p><p>Style: ${data.requestedStyle}</p><p>Lien photos: <a href="${data.photosLink}">${data.photosLink}</a></p><p>${data.message}</p>`
    });

    await sendMail({
      to: data.email,
      subject: 'Qlyk Studio Auto — Dépôt véhicule reçu',
      text: 'Votre dépôt véhicule a bien été reçu. Nous revenons vers vous avec une proposition rapidement.',
      html: '<p>Votre dépôt véhicule a bien été reçu.<br/>Nous revenons vers vous rapidement avec une proposition.</p>'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
