import nodemailer from 'nodemailer';

const smtpPort = Number(process.env.SMTP_PORT ?? 587);

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendMail(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const from = process.env.MAIL_FROM;

  if (!from) {
    throw new Error('MAIL_FROM manquant dans les variables d\'environnement.');
  }

  await transporter.sendMail({
    from,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html
  });
}
