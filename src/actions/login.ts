'use server'

import { LoginSchema } from '@/schemas'
import { z } from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFileds = LoginSchema.safeParse(values)

    if (!validatedFileds.success) {
        return { error: validatedFileds.error.message }
    }

    return { success: 'Email foi enviado!' }
}
