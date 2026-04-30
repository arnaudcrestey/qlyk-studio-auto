import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { contactSchema } from '@/lib/validations';

const offerLabels: Record<string, string> = {
  essentiel: 'Essentiel — 39€ HT',
  pro: 'Pro — 89€ HT',
  concession: 'Concession — sur devis'
};

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getOptionalValue(data: unknown, key: string): string {
  if (typeof data !== 'object' || data === null) return '';
  const value = (data as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : '';
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

    const offerValue =
      'offer' in data && typeof data.offer === 'string'
        ? data.offer
        : 'non-renseignee';

    const selectedOffer = offerLabels[offerValue] || 'Non renseignée';
    const isConcession = offerValue === 'concession';

    const firstName = escapeHtml(data.firstName);
    const lastName = escapeHtml(data.lastName);
    const email = escapeHtml(data.email);
    const phone = escapeHtml(data.phone || 'Non renseigné');
    const company = escapeHtml(data.company || 'Non renseigné');
    const message = escapeHtml(data.message || 'Aucun message complémentaire.');
    const safeOffer = escapeHtml(selectedOffer);

    const volume = escapeHtml(getOptionalValue(data, 'volume') || 'Non renseigné');
    const location = escapeHtml(getOptionalValue(data, 'location') || 'Non renseigné');

    await sendMail({
      to: recipient,
      subject: isConcession
        ? 'Nouvelle demande concession Qlyk — Sur devis'
        : `Nouveau contact Qlyk — ${selectedOffer}`,
      text: `
Nouveau contact Qlyk Studio Auto

Type de demande : ${isConcession ? 'Contact concession / sur devis' : 'Dépôt véhicule'}
Offre sélectionnée : ${selectedOffer}

Client :
${data.firstName} ${data.lastName}
Email : ${data.email}
Téléphone : ${data.phone || 'Non renseigné'}
Société : ${data.company || 'Non renseigné'}
Volume mensuel : ${getOptionalValue(data, 'volume') || 'Non renseigné'}
Ville / secteur : ${getOptionalValue(data, 'location') || 'Non renseigné'}

Message :
${data.message || 'Aucun message complémentaire.'}

Qlyk Studio Auto
Notification automatique
      `,
      html: `
        <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
            <div style="padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#0d0d0d;">
              <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#3b82f6;">
                Qlyk Studio Auto
              </p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff;">
                ${isConcession ? 'Nouvelle demande concession' : 'Nouveau contact entrant'}
              </h1>
              <p style="margin:10px 0 0 0;font-size:14px;line-height:1.6;color:#a3a3a3;">
                Une nouvelle demande vient d’être envoyée depuis le site.
              </p>
            </div>

            <div style="margin-top:22px;padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#111111;">
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#ffffff;">Type de demande</h2>
              <p style="margin:0;font-size:18px;font-weight:700;color:#3b82f6;">${safeOffer}</p>
            </div>

            <div style="margin-top:22px;padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#111111;">
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#ffffff;">Informations client</h2>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Nom :</strong> ${firstName} ${lastName}</p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Email :</strong> ${email}</p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Téléphone :</strong> ${phone}</p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Société :</strong> ${company}</p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;"><strong>Volume mensuel :</strong> ${volume}</p>
              <p style="margin:0;color:#d4d4d4;"><strong>Ville / secteur :</strong> ${location}</p>
            </div>

            <div style="margin-top:22px;padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#111111;">
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#ffffff;">Message</h2>
              <p style="margin:0;font-size:14px;line-height:1.7;color:#d4d4d4;">${message}</p>
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
      subject: isConcession
        ? 'Qlyk Studio Auto — Votre demande concession a bien été reçue'
        : 'Qlyk Studio Auto — Votre demande a bien été reçue',
      text: isConcession
        ? `
Bonjour ${data.firstName},

Nous avons bien reçu votre demande concernant une production visuelle sur devis pour votre garage ou concession.

Nous allons analyser votre besoin, votre volume, votre type de véhicules et votre usage des visuels afin de vous proposer une approche adaptée.

Nous revenons vers vous rapidement pour échanger et préciser la suite.

À très bientôt,

Qlyk Studio Auto
Studio visuel automobile premium
        `
        : `
Bonjour ${data.firstName},

Nous avons bien reçu votre demande.

Offre sélectionnée : ${selectedOffer}

Notre équipe va analyser votre besoin et revenir vers vous rapidement.

Chaque visuel est travaillé avec précision afin d’obtenir un rendu professionnel, réaliste et directement exploitable pour la mise en valeur de votre véhicule.

À très bientôt,

Qlyk Studio Auto
Studio visuel automobile premium
        `,
      html: isConcession
        ? `
        <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
            <div style="padding:26px;border:1px solid #1f2937;border-radius:20px;background:#0d0d0d;">
              <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#3b82f6;">
                Qlyk Studio Auto
              </p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;">
                Votre demande concession a bien été reçue
              </h1>
              <p style="margin:12px 0 0 0;font-size:14px;line-height:1.7;color:#a3a3a3;">
                Production visuelle automobile premium sur devis
              </p>
            </div>

            <div style="margin-top:24px;padding:26px;border:1px solid #1f2937;border-radius:20px;background:#111111;">
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Bonjour ${firstName},
              </p>
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Nous avons bien reçu votre demande concernant une production visuelle sur devis pour votre garage ou concession.
              </p>
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Nous allons analyser votre besoin, votre volume, votre type de véhicules et votre usage des visuels afin de vous proposer une approche adaptée à votre fonctionnement.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Nous revenons vers vous rapidement pour échanger et préciser la suite.
              </p>
            </div>

            <div style="margin-top:24px;padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#0d0d0d;">
              <p style="margin:0 0 10px 0;font-size:14px;line-height:1.7;color:#d4d4d4;">
                <strong style="color:#ffffff;">Votre demande concerne :</strong>
              </p>
              <p style="margin:0;font-size:14px;line-height:1.8;color:#a3a3a3;">
                — Une production régulière ou sur mesure<br/>
                — Une cohérence visuelle pour vos annonces<br/>
                — Une mise en valeur professionnelle de vos véhicules<br/>
                — Une approche respectueuse du véhicule d’origine
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
        : `
        <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
            <div style="padding:26px 26px;border:1px solid #1f2937;border-radius:20px;background:#0d0d0d;text-align:left;">
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

            <div style="margin-top:24px;padding:26px;border:1px solid #1f2937;border-radius:20px;background:#111111;">
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Bonjour ${firstName},
              </p>
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Nous avons bien reçu votre demande concernant l’offre <strong style="color:#ffffff;">${safeOffer}</strong>.
              </p>
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Notre équipe va analyser les éléments transmis afin de vous accompagner avec un rendu professionnel, réaliste et adapté à la valorisation de votre véhicule.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Nous revenons vers vous rapidement avec la suite du traitement.
              </p>
            </div>

            <div style="margin-top:24px;padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#0d0d0d;">
              <p style="margin:0 0 10px 0;font-size:14px;line-height:1.7;color:#d4d4d4;">
                <strong style="color:#ffffff;">Ce que nous garantissons :</strong>
              </p>
              <p style="margin:0;font-size:14px;line-height:1.8;color:#a3a3a3;">
                — Un rendu visuel premium<br/>
                — Une mise en valeur professionnelle<br/>
                — Aucun changement du véhicule : forme, couleur, jantes et proportions sont respectées
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
