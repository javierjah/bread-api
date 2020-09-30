import path from 'path';
import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';

const templateDir = path.resolve(__dirname, 'templates', 'purchase');
const defaultSubject = 'Pedido Agua y Arina  ✔';
const EMAILS = ['javier.palacios.h@gmail.com', 'dominic.fernandezv@gmail.com'];

// email-templates init to parse html files
const email = new EmailTemplates({
  preview: true,
  views: {
    options: {
      extension: 'ejs',
    },
  },
});

function emailSender({ emailTo = EMAILS, subject = defaultSubject, emailParams }) {
  email
    .render(
      {
        path: templateDir,
        juiceResources: {
          preserveImportant: true,
          webResources: {
            relativeTo: templateDir,
          },
        },
      },
      emailParams,
    )
    .then(async htmlTemplate => {
      const EMAIL = process.env.EMAIL;
      const EMAIL_PASS = process.env.EMAIL_PASS;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: EMAIL_PASS,
        },
      });

      // Render a single email with one template
      const mailOptions = {
        // Comma separated list of recipients
        to: emailTo,
        // Subject of the message
        subject,
        // HTML body
        html: htmlTemplate,
      };

      transporter.sendMail(mailOptions, (emailError, info) => {
        if (emailError) {
          console.log('emailError', emailError);
          throw emailError;
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
    .catch(err => {
      console.log('email render error:', err);
      throw err;
    });
}

export default emailSender;
