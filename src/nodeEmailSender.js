import nodemailer from 'nodemailer';

const defaultSubject = `Pedido nùmero ${new Date()} ✔`;
const defaultText = 'Tu pedido ah sido enviado con exito';
const IMAGE_URL =
  'https://www.recipetineats.com/wp-content/uploads/2020/05/No-Yeast-Sandwhich-Bread_9-1.jpg';

const EMAILS = ['javier.palacios.h@gmail.com', 'dominic.fernandezv@gmail.com'];

function emailSender(emailTo = EMAILS, subject = defaultSubject, text = defaultText) {
  const EMAIL = process.env.EMAIL;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    // Comma separated list of recipients
    to: emailTo,
    // Subject of the message
    subject,
    // plaintext body
    // text,
    // HTML body
    html: `<h1>${text}</h1><p><b>Muchas gracias, por tu pedido se esta realizando</b> <br><br></p><img width="800" height="600" src="${IMAGE_URL}"/>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export default emailSender;
