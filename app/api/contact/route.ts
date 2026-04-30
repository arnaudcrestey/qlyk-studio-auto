import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { z } from 'zod';

/**
 * VALIDATION
 */
const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  offer: z.enum(['essentiel', 'pro', 'concession'])
});

/**
 * LABEL OFFRES
 */
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

    const selectedOffer = offerLabels[data.offer] || data.offer;

    /**
     * EMAIL ADMIN
     */
    await sendMail({
      to: recipient,
      subject: `🚗 Nouveau dépôt — ${selectedOffer}`,
      html: `
      <div style="font-family: Arial, sans-serif; background:#0a0a0a; color:#ffffff; padding:30px;">
        
        <div style="max-width:600px; margin:auto;">
          
          <h2 style="margin-bottom:20px;">Nouveau dépôt véhicule</h2>
          
          <div style="background:#111; padding:20px; border-radius:8px;">
            <p><strong>Offre :</strong> ${selectedOffer}</p>
            <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email :</strong> ${data.email}</p>
            <p><strong>Téléphone :</strong> ${data.phone || 'Non renseigné'}</p>
            <p><strong>Société :</strong> ${data.company || 'Non renseigné'}</p>
          </div>

          <div style="margin-top:20px; background:#111; padding:20px; border-radius:8px;">
            <p><strong>Message :</strong></p>
            <p>${data.message || 'Aucun message.'}</p>
          </div>

          <hr style="border:none; border-top:1px solid #222; margin:30px 0;" />

          <p style="font-size:12px; color:#888;">
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
