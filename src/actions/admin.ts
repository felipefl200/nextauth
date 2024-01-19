'use server'

import { currentUser } from "@/lib/authUtils"
import { UserRole } from "@prisma/client"

export const admin = async () => {
    const { role } = await currentUser()

    if (role === UserRole.ADMIN) {
        return { success: 'Access granted' }
    }

    return { error: 'FORBIDDEN' }
}