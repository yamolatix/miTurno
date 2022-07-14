const nodemailer = require("nodemailer");
const htmlTemplate = require("./html");

// const mail = {
//   user: "nachogarcia_78@yahoo.com.ar",
//   password: "miTurno9",
// };

// (lo que sigue se copia desde el site de nodemailer)

// const createTransp = () => {
//   const transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "b8662c574f2f90",
//       pass: "d974f6453ba339",
//     },
//   });
//   return transport;
// };

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b8662c574f2f90",
    pass: "d974f6453ba339",
  },
});


// const sendMailRegister = async (user) => {
//   const transporter = createTransp();
//   const info = await transporter.sendMail({
//     from: `info@miturno.com`, //correo desde el cual se envía el mensaje ej: info@miturno.com
//     to: `${user.email}`, //correo del usuario al cual se le enviará el mensaje ej: puede ser cuando se registra un usuario o cuando se le envía una contraseña
//     subject: `Hola ${user.fname[0].toUpperCase()}${user.fname.substring(
//       1
//     )}, bienvenid@ a miTurno`,
//     text: "Muchas gracias por utilizar nuestro servicio",
//     html: htmlTemplate,
//   });
//   console.log("Message sent: %s", info.messageId);

//   return;
// };

// const sendMailNewPass = async (user) => {
//   const transporter = createTransp();
//   const info = await transporter.sendMail({
//     from: `info@miturno.com`, //correo desde el cual se envía el mensaje ej: info@miturno.com
//     to: `${user.email}`, //correo del usuario al cual se le enviará el mensaje ej: puede ser cuando se registra un usuario o cuando se le envía una contraseña
//     subject: `Hola ${user.fname[0].toUpperCase()}${user.fname.substring(
//       1
//     )}, bienvenid@ a miTurno`,
//     text: "Muchas gracias por utilizar nuestro servicio",
//     html: `<h3>Por favor clickea sobre el link para resetear tu contraseña</h3>
//     <p>http://localhost:3001/api/user/newPassword/${token}</p>`,
//   });
//   console.log("Message sent: %s", info.messageId);

//   return;
// };

module.exports = transport;
//exports.sendMailRegister = (user) => sendMailRegister(user); //se exporta con el nombre sendMail y que hará referencia a la función sendMail
//exports.sendMailNewPass = (user) => sendMailNewPass(user);

// const transporter = nodemailer.createTransport({
//   host: "smtp.mail.yahoo.com",
//   port: 587,
//   tls: {
//     rejectUnauthorized: false,
//   },
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: mail.user, // generated ethereal user
//     password: mail.password, // generated ethereal password
//   },
// });

// const sendEmail = async (email, subject, html) => {
//   try {
//     await transporter.sendMail({
//       from: `miTurno <${mail.user}>`, // sender address
//       to: email, // list of receivers
//       subject, // Subject line
//       text: "OPCIONAL: Hello world?", // plain text body
//       html, // html body
//     });
//   } catch (error) {
//     console.log("Algo no va bien con el email", error);
//   }
// };

// const getTemplate = (name, token) => {
//   return `
//         <head>
//             <link rel="stylesheet" href="./style.css">
//         </head>

//         <div id="email___content">
//             <img src="https://i.imgur.com/eboNR82.png" alt="">
//             <h2>Hola ${name}</h2>
//             <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
//             <a
//                 href="http://localhost:3001/api/user/confirm/${token}"
//                 target="_blank"
//             >Confirmar Cuenta</a>
//         </div>
//       `;
// };

// module.exports = {
//   sendEmail,
//   getTemplate,
// };
