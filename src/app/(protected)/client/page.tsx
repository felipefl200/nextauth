'use client'

import { UserInfo } from '@/components/user-info'
import { useCurrentUser } from '@/hooks/use-current-user'

export default async function ClientComponent() {
    const user = await useCurrentUser()
    return (
        <div>
            <UserInfo user={user} label="Client component" />
        </div>
    )
}
