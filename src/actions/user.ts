import { db } from '@/lib/db'
import { exclude } from '@/utils/userWithoutPassword'

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: { email },
        })
        return user
    } catch (error) {
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id },
        })
        const userWithoutPassword = exclude(user, 'password')
        return userWithoutPassword
    } catch (error) {
        return null
    }
}

export const getUserByIdWithPassword = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id }
        })
        return user
    } catch {
        return null
    }
}