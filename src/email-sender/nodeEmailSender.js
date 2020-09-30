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
      // email config vars
      const EMAIL = process.env.EMAIL;
      const EMAIL_PASS = process.env.EMAIL_PASS;
      const OAUTH2_CLIENT_ID = process.env.OAUTH2_CLIENT_ID;
      const OAUTH2_CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET;
      const OAUTH2_REFRESH_TOKEN = process.env.OAUTH2_REFRESH_TOKEN;
      const OAUTH2_ACCESS_TOKEN = process.env.OAUTH2_ACCESS_TOKEN;

      // nodemailer transport config
      const transportConfigDev = {
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: EMAIL_PASS,
        },
      };

      const transportconfigProd = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          clientId: OAUTH2_CLIENT_ID,
          clientSecret: OAUTH2_CLIENT_SECRET,
        },
      };

      let transporterConfig = transportConfigDev;

      if (process.env.NODE_ENV === 'production') {
        transporterConfig = transportconfigProd;
      }

      const transporter = nodemailer.createTransport(transporterConfig);

      const mailOptions = {
        to: emailTo,
        subject,
        html: htmlTemplate,
        auth:
          process.env.NODE_ENV === 'production'
            ? {
                user: EMAIL,
                refreshToken: OAUTH2_REFRESH_TOKEN,
                accessToken: OAUTH2_ACCESS_TOKEN,
                expires: 3599,
              }
            : undefined,
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
