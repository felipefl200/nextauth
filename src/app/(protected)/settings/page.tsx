import { auth, signOut } from '@/providers/auth'


export default async function SettingPage() {
    const session = await auth()
    return (
        <div>
            <div>
                <h1>Página protegida!</h1>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div>
               
            </div>
        </div>
    )
}
