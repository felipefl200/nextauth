import { UserInfo } from '@/components/user-info'
import { currentUser } from '@/lib/authUtils'

export default async function ServerComponent() {
    const user = await currentUser()
    return (
        <div>
            <UserInfo user={user} label="Server component" />
        </div>
    )
}
