import Sib from 'sib-api-v3-sdk'
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY
const tranEmailApi = new Sib.TransactionalEmailsApi()
const emailConfirmar = async (cliente) => {
    const sender = {
        email: 'thatanjan@gmail.com',
        name: 'Anjan',
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
        subject: 'Confirma tu cuenta en libreria',
        textContent: `
        Para poder inciar sesion, confirma tu cuenta.
        `,
        htmlContent: `
        <h1>Hola ${cliente.nombre}</h1> 
        <p>Recientemente has creado tu cuenta en Libreria, para confirmar haz click en el siguiente enlace:</p>
        <a href=${process.env.FRONTEND_PORT}/confirmar-cuenta/${cliente.token}>Confirma tu cuenta</a>
        <p>Si desconoces esta actividad, puedes ignorar el correo</p>
                `,
        params: {
            role: 'Frontend',
        },
    })
}

export default  emailConfirmar