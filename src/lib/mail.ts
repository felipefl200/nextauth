import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/new-password?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset de senha',
        html: `<p>Clique no link abaixo para criar sua nova senha: </p><br /> <a href="${resetLink}">Clique aqui</a>`,
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirme seu email',
        html: `<p>Clique no link abaixo para confirmar seu email: </p><br /> <a href="${confirmLink}">Clique aqui</a>`,
    })
}
