'use client'

import { useCurrentUser } from '@/hooks/use-current-user'

export default function SettingPage() {
    const user = useCurrentUser()
    return (
        <div>
            <div>
                <h1>Página protegida!</h1>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
            <div></div>
        </div>
    )
}
