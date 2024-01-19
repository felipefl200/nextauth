import { NextResponse } from 'next/server'
import { currentUser } from '@/lib/authUtils'
import { UserRole } from '@prisma/client'

export async function GET() {
    const { role } = await currentUser()
    if (role === UserRole.ADMIN)
        return new NextResponse(null, { status: 200 })

    return new NextResponse(null, { status: 403 })
}