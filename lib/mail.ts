import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT ?? 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const mailFrom = process.env.MAIL_FROM;

if (!smtpHost) throw new Error('SMTP_HOST manquant.');
if (!smtpUser) throw new Error('SMTP_USER manquant.');
if (!smtpPass) throw new Error('SMTP_PASS manquant.');
if (!mailFrom) throw new Error('MAIL_FROM manquant.');

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

export async function sendMail(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: mailFrom,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html
    });
  } catch (error) {
    console.error('SENDMAIL ERROR:', error);
    throw error;
  }
}
