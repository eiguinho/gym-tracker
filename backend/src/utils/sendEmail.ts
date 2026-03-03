import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (to: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Gym Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Seu código de verificação - Gym Tracker',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2>Bem-vindo ao Gym Tracker!</h2>
        <p>Seu código de verificação para ativar a conta é:</p>
        <h1 style="color: #4f46e5; letter-spacing: 5px; font-size: 36px;">${code}</h1>
        <p>Este código expira em 15 minutos.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};