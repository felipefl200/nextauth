import NextAuth from 'next-auth'
import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/providers/auth.config'
import { getUserById } from '@/actions/user'
import { UserRole } from '@prisma/client'

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
            if (!existingUser || !existingUser.emailVerified) return false
            if (account?.provider !== 'credentials') return true

            //TODO: add 2FA check

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
        async jwt({ token, user }) {
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
