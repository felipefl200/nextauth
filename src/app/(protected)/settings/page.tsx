import { LogoutButton } from '@/components/auth/logout-button'
import { auth } from '@/providers/auth'

export default async function SettingPage() {
    const session = await auth()
    return (
        <div>
            <div>
                <h1>Página protegida!</h1>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div>
                <LogoutButton>Sair</LogoutButton>
            </div>
        </div>
    )
}
