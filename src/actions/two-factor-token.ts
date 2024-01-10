import { db } from '@/lib/db'

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactor = await db.twoFactorToken.findUnique({
            where: { token },
        })
        return twoFactor
    } catch {
        return null
    }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactor = await db.twoFactorToken.findFirst({
            where: { email },
        })
        return twoFactor
    } catch {
        return null
    }
}
