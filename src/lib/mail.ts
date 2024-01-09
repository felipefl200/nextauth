import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirme seu email',
        html: `<p>Clique no link abaixo para confirmar seu email: </p><br /> <a href="${confirmLink}">Clique aqui</a>`,
    })
}
