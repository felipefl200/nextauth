import NextAuth from 'next-auth'
import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/providers/auth.config'
import { getUserById } from '@/actions/user'
import { UserRole } from '@prisma/client'
import { getTwoFactorConfirmationByUserId } from '@/actions/two-factor-confirmation'

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: '/login',
        error: '/error',
    },
    events: {
        async linkAccount({ user }) {
            db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            const existingUser = await getUserById(user.id)
            if (account?.provider !== 'credentials') return true
            if (!existingUser || !existingUser.emailVerified) return false

            if (existingUser.isTwoFactor) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false

                await db.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } })
            }

            return true
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.role = existingUser.role
            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})
