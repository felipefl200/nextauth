import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'
import { getVerificationTokenByEmail } from '@/actions/verification-token'
import { getPasswordResetTokenByEmail } from '@/actions/password-reset-token'
import { generateTwoFactorCode } from '@/lib/handle-crypt'
import { getTwoFactorTokenByEmail } from '@/actions/two-factor-token'

export const generateTwoFactorToken = async (email: string) => {
    const token = await generateTwoFactorCode()
    const expires = new Date(new Date().getTime() + 300000) // 5 minutes

    const existingToken = await getTwoFactorTokenByEmail(email)
    if (existingToken) {
        await db.twoFactorToken.delete({ where: { id: existingToken.id } })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return twoFactorToken
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600000) // 1 hour

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id },
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return passwordResetToken
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600000) // 1 hour

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id },
        })
    }
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    })
    return verificationToken
}
