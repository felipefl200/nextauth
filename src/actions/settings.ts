'use server'

import { z } from 'zod'
import { currentUser } from '@/lib/authUtils'
import { db } from '@/lib/db'
import { SettingsSchema } from '@/schemas'
import { getUserById } from './user'

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser()

    if (!user) return { error: 'Unauthorized' }

    const dbUser = await getUserById(user.id)
    if (!user) return { error: 'Unauthorized' }

    await db.user.update({
        where: { id: dbUser?.id },
        data: {
            ...values
        }
    })
    return { success: 'Settings Updated' }
}