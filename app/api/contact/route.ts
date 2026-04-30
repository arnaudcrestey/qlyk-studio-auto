import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { contactSchema } from '@/lib/validations';

const offerLabels: Record<string, string> = {
  essentiel: 'Essentiel — 39€ HT',
  pro: 'Pro — 89€ HT',
  concession: 'Contact / demande sur devis',
  contact: 'Contact / demande générale'
};

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getRawValue(source: unknown, key: string): string {
  if (typeof source !== 'object' || source === null) return '';
  const value = (source as Record<string, unknown>)[key];
  return typeof value === 'string' ? value.trim() : '';
}

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
      return NextResponse.json(
        { error: 'MAIL_TO manquant dans la configuration.' },
        { status: 500 }
      );
    }

    const offerValue = getRawValue(json, 'offer') || 'contact';
    const selectedOffer = offerLabels[offerValue] || 'Contact / demande générale';

    const firstNameRaw = data.firstName;
    const lastNameRaw = data.lastName;
    const emailRaw = data.email;
    const phoneRaw = data.phone || 'Non renseigné';
    const companyRaw = data.company || 'Non renseigné';
    const messageRaw = data.message || 'Aucun message complémentaire.';
    const volumeRaw = getRawValue(json, 'volume') || 'Non renseigné';
    const locationRaw = getRawValue(json, 'location') || 'Non renseigné';

    const firstName = escapeHtml(firstNameRaw);
    const lastName = escapeHtml(lastNameRaw);
    const email = escapeHtml(emailRaw);
    const phone = escapeHtml(phoneRaw);
    const company = escapeHtml(companyRaw);
    const message = escapeHtml(messageRaw);
    const volume = escapeHtml(volumeRaw);
    const location = escapeHtml(locationRaw);
    const safeOffer = escapeHtml(selectedOffer);

    await sendMail({
      to: recipient,
      subject: `Nouvelle demande Qlyk Studio Auto — ${selectedOffer}`,
      text: `
Nouvelle demande Qlyk Studio Auto

Type de demande : ${selectedOffer}

Client :
${firstNameRaw} ${lastNameRaw}
Email : ${emailRaw}
Téléphone : ${phoneRaw}
Société / garage : ${companyRaw}
Volume / besoin : ${volumeRaw}
Ville / secteur : ${locationRaw}

Message :
${messageRaw}

Qlyk Studio Auto
Notification automatique
      `,
      html: `
        <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:660px;margin:0 auto;padding:32px 20px;">
            <div style="padding:24px;border:1px solid #1f2937;border-radius:20px;background:#0d0d0d;">
              <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#3b82f6;">
                Qlyk Studio Auto
              </p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;">
                Nouvelle demande entrante
              </h1>
              <p style="margin:12px 0 0 0;font-size:14px;line-height:1.7;color:#a3a3a3;">
                Une demande vient d’être envoyée depuis le site.
              </p>
            </div>

            <div style="margin-top:22px;padding:24px;border:1px solid #1f2937;border-radius:20px;background:#111111;">
              <h2 style="margin:0 0 14px 0;font-size:16px;color:#ffffff;">Type de demande</h2>
              <p style="margin:0;font-size:18px;font-weight:700;color:#3b82f6;">${safeOffer}</p>
            </div>

            <div style="margin-top:22px;padding:24px;border:1px solid #1f2937;border-radius:20px;background:#111111;">
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#ffffff;">Informations client</h2>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Nom :</strong> ${firstName} ${lastName}</p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Email :</strong> ${email}</p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Téléphone :</strong> ${phone}</p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Société / garage :</strong> ${company}</p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Volume / besoin :</strong> ${volume}</p>
              <p style="margin:0;color:#d4d4d4;"><strong>Ville / secteur :</strong> ${location}</p>
            </div>

            <div style="margin-top:22px;padding:24px;border:1px solid #1f2937;border-radius:20px;background:#111111;">
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#ffffff;">Message</h2>
              <p style="margin:0;font-size:14px;line-height:1.8;color:#d4d4d4;">${message}</p>
            </div>

            <p style="margin:28px 0 0 0;font-size:12px;line-height:1.6;color:#737373;text-align:center;">
              Qlyk Studio Auto — Notification automatique
            </p>
          </div>
        </div>
      `
    });

    await sendMail({
      to: data.email,
      subject: 'Qlyk Studio Auto — Votre demande a bien été reçue',
      text: `
Bonjour ${firstNameRaw},

Nous avons bien reçu votre demande.

Les informations transmises vont être étudiées avec attention afin de vous répondre de manière claire et adaptée.

Nous revenons vers vous rapidement avec la suite.

À très bientôt,

Qlyk Studio Auto
Studio visuel automobile premium
      `,
      html: `
        <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:660px;margin:0 auto;padding:32px 20px;">
            <div style="padding:26px;border:1px solid #1f2937;border-radius:22px;background:#0d0d0d;">
              <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#3b82f6;">
                Qlyk Studio Auto
              </p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;">
                Votre demande a bien été reçue
              </h1>
              <p style="margin:12px 0 0 0;font-size:14px;line-height:1.7;color:#a3a3a3;">
                Studio visuel automobile premium
              </p>
            </div>

            <div style="margin-top:24px;padding:26px;border:1px solid #1f2937;border-radius:22px;background:#111111;">
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Bonjour ${firstName},
              </p>

              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Nous avons bien reçu votre demande.
              </p>

              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Les informations transmises vont être étudiées avec attention afin de vous répondre de manière claire et adaptée.
              </p>

              <p style="margin:0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Nous revenons vers vous rapidement avec la suite.
              </p>
            </div>

            <div style="margin-top:24px;padding:22px 24px;border:1px solid #1f2937;border-radius:20px;background:#0d0d0d;">
              <p style="margin:0 0 10px 0;font-size:14px;line-height:1.7;color:#d4d4d4;">
                <strong style="color:#ffffff;">Ce que nous garantissons :</strong>
              </p>
              <p style="margin:0;font-size:14px;line-height:1.8;color:#a3a3a3;">
                — Une réponse claire et personnalisée<br/>
                — Un traitement sérieux de votre demande<br/>
                — Une approche visuelle professionnelle et respectueuse du véhicule d’origine
              </p>
            </div>

            <div style="margin-top:28px;">
              <p style="margin:0 0 6px 0;font-size:15px;color:#ffffff;">À très bientôt,</p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#d4d4d4;">
                <strong style="color:#ffffff;">Qlyk Studio Auto</strong><br/>
                Studio visuel automobile premium<br/>
                <span style="color:#737373;">Optimisation visuelle pour la vente de véhicules</span>
              </p>
            </div>

            <p style="margin:28px 0 0 0;font-size:12px;line-height:1.6;color:#737373;text-align:center;">
              Ceci est une confirmation automatique suite à votre demande.
            </p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
