import nodemailer from 'nodemailer';

const emailRecuperar = async (cliente) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    var message = {
        from: "libreria@gdl.com",
        to: cliente.correo,
        subject: "Restablecer contraseña en Libreria",
        html: `
        <h1>Hola ${cliente.nombre}</h1> 
        <p>Recientemente has solicitado restablecer tu contraseña en Libreria, para confirmar haz click en el siguiente enlace:</p>
        <a href=${process.env.FRONTEND_PORT}/olvide-password/${cliente.token}>Restablecer tu contraseña</a>
        <p>Si desconoces esta actividad, puedes ignorar el correo</p>
        `
      };

      await transport.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

export default  emailRecuperar