const nodemailer = require('nodemailer');

const mail = {
    user: 'nachogarcia_78@yahoo.com.ar',
    password: 'miTurno9'
}

// (lo que sigue se copia desde el site de nodemailer)

let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 587,
    tls: {
        rejectUnauthorized: false
    },
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      password: mail.password, // generated ethereal password
    },
  });

  const sendEmail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: `miTurno <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "OPCIONAL: Hello world?", // plain text body
            html, // html body
        });
    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
  }

  const getTemplate = (name, token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>

        <div id="email___content">
            <img src="https://i.imgur.com/eboNR82.png" alt="">
            <h2>Hola ${ name }</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:3001/api/user/confirm/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
      `    
  }

  module.exports = {
    sendEmail,
    getTemplate
  }