'use server'

import { signIn } from '@/providers/auth'
import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/utils/routes-settings'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { getUserByEmail } from './user'
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens'
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail'
import { verifyPassword } from '@/lib/handle-crypt'

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFileds = LoginSchema.safeParse(values)

    if (!validatedFileds.success) {
        return { error: validatedFileds.error.message }
    }

    const { email, password } = validatedFileds.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Credenciais inválidas' }
    }

    const passOK = await verifyPassword(password, existingUser.password)
    if (!passOK) return { error: 'Senha incorreta' }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email)

        generateVerificationToken(existingUser.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        return { success: 'Email do confirmação enviado!' }
    }

    if (existingUser.isTwoFactor && existingUser.email) {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token)

        return { twoFactor: true }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Credenciais inválidas!' }
                default:
                    return { error: 'Erro desconhecido!' }
            }
        }
        throw error
    }
}
