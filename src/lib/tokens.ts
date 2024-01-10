import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'
import { getVerificationTokenByEmail } from '@/actions/verification-token'
import { getPasswordResetTokenByEmail } from '@/actions/password-reset-token'

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
