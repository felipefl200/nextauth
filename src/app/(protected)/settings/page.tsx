import { auth } from '@/providers/auth'

export default async function SettingPage() {
    const session = await auth()
    return <h1>Página protegida!</h1>
}
