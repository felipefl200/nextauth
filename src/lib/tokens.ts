import { getVerificationTokenByEmail } from '@/actions/verification-token'
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600000) // 1 hour

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        const tokenDB = await db.verificationToken.update({
            where: { id: existingToken.id },
            data: {
                token,
                email: existingToken.email,
                expires,
            },
        })
        console.log('Token update:', tokenDB)
        return tokenDB
    }
}
