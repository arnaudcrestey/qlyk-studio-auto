import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { contactSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

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
      subject: `Nouveau contact — ${data.firstName} ${data.lastName}`,
      text: `Nouveau message de ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nTéléphone: ${data.phone}\nSociété: ${data.company}\n\n${data.message}`,
      html: `<p><strong>Nouveau message</strong></p><p>${data.firstName} ${data.lastName}</p><p>Email: ${data.email}</p><p>Téléphone: ${data.phone}</p><p>Société: ${data.company}</p><p>${data.message}</p>`
    });

    await sendMail({
      to: data.email,
      subject: 'Qlyk Studio Auto — Confirmation de réception',
      text: 'Nous avons bien reçu votre message. Notre équipe vous répond rapidement.',
      html: '<p>Nous avons bien reçu votre message.<br/>Notre équipe vous répond rapidement.</p>'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
