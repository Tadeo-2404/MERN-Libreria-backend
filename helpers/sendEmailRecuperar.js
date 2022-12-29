import Sib from 'sib-api-v3-sdk'
const client = Sib.ApiClient.instance
const apiKey = client.authentications[process.env.API_KEY]
apiKey.apiKey = process.env.API_KEY
const tranEmailApi = new Sib.TransactionalEmailsApi()
const emailRecuperar = async (cliente) => {
    const sender = {
        email: 'libreria@libreria.com',
        name: 'soporte',
    }
    const receivers = [
        {
            email: `${cliente.correo}`,
        },
    ]

    await tranEmailApi
    .sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Restablecer contraseña en Libreria',
        textContent: `
        Confirma tu nueva contraseña
        `,
        htmlContent: `
        <h1>Hola ${cliente.nombre}</h1> 
        <p>Recientemente has solicitado restablecer tu contraseña en Libreria, para confirmar haz click en el siguiente enlace:</p>
        <a href=${process.env.FRONTEND_PORT}/olvide-password/${cliente.token}>Restablecer tu contraseña</a>
        <p>Si desconoces esta actividad, puedes ignorar el correo</p>
                `,
    })
}

export default  emailRecuperar