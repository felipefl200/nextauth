'use server'

import { z } from 'zod'
import { currentUser } from '@/lib/authUtils'
import { db } from '@/lib/db'
import { SettingsSchema } from '@/schemas'
import { getUserByEmail, getUserById } from './user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser()

    if (!user) return { error: 'Unauthorized' }

    const dbUser = await getUserById(user.id)
    if (!user) return { error: 'Unauthorized' }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== user.id) return { error: 'O email já está em uso' }

        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: 'Email de verificação foi enviado' }
    }


    await db.user.update({
        where: { id: dbUser?.id },
        data: {
            ...values
        }
    })
    return { success: 'Configurações atualizadas' }
}