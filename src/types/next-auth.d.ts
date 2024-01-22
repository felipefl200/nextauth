import { UserRole } from '@prisma/client'
import NextAuth, { type DefaultSession } from 'next-auth'
import { type JWT } from 'next-auth/jwt'

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole
    isTwoFactor: boolean
    isOAuth: boolean
}

declare module 'next-auth' {
    interface Session {
        user: ExtendedUsers
    }
}
