const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html, attachmentPath) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: '26b04256b09a37',  // 👈 Paste Mailtrap user here
      pass: '5a6a9a35e1045a',  // 👈 Paste Mailtrap pass here
    },
  });

  const mailOptions = {
    from: '"CertifyMe" <certifyme@mailtrap.io>',
    to,
    subject,
    html,
    attachments: [
      {
        filename: 'certificate.pdf',
        path: attachmentPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
