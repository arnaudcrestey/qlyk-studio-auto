import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

const INTERNAL_QQLYK_EMAIL = "contact@qlykstudio.fr";

function clean(value?: string) {
  return value && value.trim() !== "" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = clean(body.email);
    const clientName = clean(body.clientName);
    const deliveryLabel = clean(body.deliveryLabel);
    const deliveryUrl = clean(body.deliveryUrl);

    if (!email) {
      return NextResponse.json(
        { error: "Email client manquant." },
        { status: 400 }
      );
    }

    if (!clientName) {
      return NextResponse.json(
        { error: "Nom du client manquant." },
        { status: 400 }
      );
    }

    if (!deliveryLabel) {
      return NextResponse.json(
        { error: "Dossier / lot livré manquant." },
        { status: 400 }
      );
    }

    if (!deliveryUrl) {
      return NextResponse.json(
        { error: "Lien de livraison manquant." },
        { status: 400 }
      );
    }

    await sendMail({
      to: email,
      subject: "QLYK Studio Auto — Vos visuels sont prêts",
      text: `
Bonjour ${clientName},

Vos visuels QLYK sont prêts.

Dossier :
${deliveryLabel}

Lien de livraison :
${deliveryUrl}

Vous pouvez consulter et télécharger l’ensemble des visuels finalisés depuis votre espace privé sécurisé.

QLYK Studio Auto
Studio visuel automobile premium
`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#050505;color:#ffffff;padding:34px;">
          <div style="max-width:620px;margin:auto;">
            <p style="font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#3b82f6;margin:0 0 10px;">
              QLYK STUDIO AUTO
            </p>

            <h1 style="margin:0 0 28px;font-size:36px;line-height:1.15;color:#ffffff;">
              Vos visuels sont prêts
            </h1>

            <p style="margin:0 0 28px;font-size:16px;line-height:1.8;color:#b8b8b8;">
              Bonjour ${clientName},
              <br /><br />
              Votre livraison QLYK est maintenant disponible.
            </p>

            <div style="background:#111111;border-radius:18px;padding:28px;margin:0 0 30px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#ffffff;">
                <strong>Dossier :</strong> ${deliveryLabel}
              </p>

              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#d4d4d4;">
                Vous pouvez consulter et télécharger l’ensemble des visuels finalisés via votre espace privé sécurisé.
              </p>

              <a href="${deliveryUrl}" target="_blank" rel="noreferrer" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:14px;font-size:14px;font-weight:700;">
                Accéder à ma livraison
              </a>
            </div>

            <p style="margin:0 0 28px;font-size:15px;line-height:1.8;color:#d4d4d4;">
              Si besoin, nous restons disponibles.
            </p>

            <p style="margin:0;font-size:15px;line-height:1.7;color:#ffffff;">
              À très bientôt,<br />
              <strong>Qlyk Studio Auto</strong><br />
              <span style="color:#888888;">Studio visuel automobile premium</span>
            </p>
          </div>
        </div>
      `,
    });

    await sendMail({
      to: INTERNAL_QQLYK_EMAIL,
      subject: `QLYK — Copie livraison envoyée — ${clientName}`,
      text: `
Copie interne QLYK

Une livraison client vient d’être envoyée.

Client :
${clientName}

Email client :
${email}

Dossier :
${deliveryLabel}

Lien de livraison :
${deliveryUrl}
`,
      html: `
        <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111111;">
          <div style="max-width:640px;margin:0 auto;padding:30px 20px;">
            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;padding:26px;margin-bottom:18px;">
              <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#2563eb;margin:0 0 8px 0;">
                QLYK STUDIO AUTO
              </p>

              <h1 style="margin:0;font-size:25px;line-height:1.3;color:#111111;">
                Copie interne — livraison envoyée
              </h1>

              <p style="margin:14px 0 0 0;font-size:14px;line-height:1.7;color:#4b5563;">
                Une livraison client vient d’être transmise automatiquement depuis l’interface QLYK.
              </p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;padding:22px;margin-bottom:18px;">
              <p style="margin:0 0 12px 0;color:#111111;">
                <strong>Client :</strong> ${clientName}
              </p>

              <p style="margin:0 0 12px 0;color:#111111;">
                <strong>Email client :</strong> ${email}
              </p>

              <p style="margin:0;color:#111111;">
                <strong>Dossier :</strong> ${deliveryLabel}
              </p>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;padding:22px;margin-bottom:18px;">
              <p style="margin:0 0 14px 0;color:#111111;">
                <strong>Lien de livraison :</strong>
              </p>

              <a href="${deliveryUrl}" target="_blank" rel="noreferrer" style="color:#2563eb;text-decoration:underline;font-size:14px;word-break:break-all;">
                ${deliveryUrl}
              </a>
            </div>

            <p style="margin:24px 0 0 0;font-size:12px;line-height:1.6;color:#6b7280;text-align:center;">
              QLYK Studio Auto — Copie automatique interne
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message:
        "Mail client envoyé avec succès. Copie interne envoyée à contact@qlykstudio.fr.",
    });
  } catch (error) {
    console.error("QLYK SEND DELIVERY EMAIL ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur inconnue.",
      },
      { status: 500 }
    );
  }
}
