import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { contactSchema } from '@/lib/validations';

const offerLabels: Record<string, string> = {
  essentiel: 'Essentiel — 39€ HT',
  pro: 'Pro — 89€ HT',
  concession: 'Concession — sur devis'
};

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

    const selectedOffer =
      'offer' in data && data.offer
        ? offerLabels[data.offer as keyof typeof offerLabels] || data.offer
        : 'Non renseignée';

    await sendMail({
      to: recipient,
      subject: `Nouveau contact Qlyk — ${selectedOffer}`,
      text: `
Nouveau contact Qlyk Studio Auto

Offre sélectionnée : ${selectedOffer}

Client :
${data.firstName} ${data.lastName}
Email : ${data.email}
Téléphone : ${data.phone || 'Non renseigné'}
Société : ${data.company || 'Non renseigné'}

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
                Nouveau contact entrant
              </h1>
              <p style="margin:10px 0 0 0;font-size:14px;line-height:1.6;color:#a3a3a3;">
                Une nouvelle demande vient d’être envoyée depuis le site.
              </p>
            </div>

            <div style="margin-top:22px;padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#111111;">
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#ffffff;">
                Offre sélectionnée
              </h2>
              <p style="margin:0;font-size:18px;font-weight:700;color:#3b82f6;">
                ${selectedOffer}
              </p>
            </div>

            <div style="margin-top:22px;padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#111111;">
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#ffffff;">
                Informations client
              </h2>

              <p style="margin:0 0 10px 0;color:#d4d4d4;">
                <strong>Nom :</strong> ${data.firstName} ${data.lastName}
              </p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;">
                <strong>Email :</strong> ${data.email}
              </p>
              <p style="margin:0 0 10px 0;color:#d4d4d4;">
                <strong>Téléphone :</strong> ${data.phone || 'Non renseigné'}
              </p>
              <p style="margin:0;color:#d4d4d4;">
                <strong>Société :</strong> ${data.company || 'Non renseigné'}
              </p>
            </div>

            <div style="margin-top:22px;padding:22px 24px;border:1px solid #1f2937;border-radius:18px;background:#111111;">
              <h2 style="margin:0 0 16px 0;font-size:16px;color:#ffffff;">
                Message
              </h2>
              <p style="margin:0;font-size:14px;line-height:1.7;color:#d4d4d4;">
                ${data.message || 'Aucun message complémentaire.'}
              </p>
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
Bonjour ${data.firstName},

Nous avons bien reçu votre demande pour Qlyk Studio Auto.

Offre sélectionnée : ${selectedOffer}

Notre équipe va analyser votre besoin et revenir vers vous rapidement.

Chaque visuel est travaillé avec précision afin d’obtenir un rendu professionnel, réaliste et directement exploitable pour la mise en valeur de votre véhicule.

À très bientôt,

Qlyk Studio Auto
Studio visuel automobile premium
      `,
      html: `
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
                Bonjour ${data.firstName},
              </p>

              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#e5e5e5;">
                Nous avons bien reçu votre demande concernant l’offre 
                <strong style="color:#ffffff;">${selectedOffer}</strong>.
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
              <p style="margin:0 0 6px 0;font-size:15px;color:#ffffff;">
                À très bientôt,
              </p>
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

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}      </div>
      `
    });

    /**
     * EMAIL CLIENT (PREMIUM)
     */
    await sendMail({
      to: data.email,
      subject: 'Qlyk Studio Auto — Demande reçue',
      html: `
      <div style="font-family: Arial, sans-serif; background:#0a0a0a; color:#ffffff; padding:30px;">
        
        <div style="max-width:600px; margin:auto;">
          
          <h1 style="font-size:22px;">Qlyk Studio Auto</h1>
          <p style="color:#888; margin-bottom:30px;">Studio visuel automobile premium</p>

          <p>Bonjour ${data.firstName},</p>

          <p>
            Votre demande concernant l’offre <strong>${selectedOffer}</strong> a bien été reçue.
          </p>

          <p>
            Chaque visuel est traité avec précision afin de produire un rendu professionnel,
            réaliste et directement exploitable pour vos annonces.
          </p>

          <p>
            Nous revenons vers vous rapidement avec une première analyse.
          </p>

          <div style="margin:30px 0; padding:20px; background:#111; border-radius:8px;">
            <p style="margin:0; font-size:14px; color:#ccc;">
              ⚡ Délai de réponse rapide<br/>
              📩 Suivi personnalisé<br/>
              🚗 Aucune modification du véhicule
            </p>
          </div>

          <p>À très bientôt,</p>

          <p>
            <strong>Qlyk Studio Auto</strong><br/>
            Studio visuel automobile premium<br/>
            <span style="color:#888;">Optimisation visuelle pour la vente de véhicules</span>
          </p>

          <hr style="border:none; border-top:1px solid #222; margin:30px 0;" />

          <p style="font-size:12px; color:#666;">
            Confirmation automatique — merci pour votre confiance.
          </p>

        </div>
      </div>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erreur interne';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
