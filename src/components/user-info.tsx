import { ExtendedUser } from '@/types/next-auth'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface UserInfoProps {
    user?: ExtendedUser
    label: string
}

export function UserInfo({ user, label }: UserInfoProps) {
    return (
        <Card className="max-w-3xl">
            <CardHeader>
                <p className="text-center text-2xl font-semibold">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm overflow-auto">
                    <p className="text-sm font-medium">ID:</p>
                    <p className="truncate rounded-md text-xs">{user?.id}</p>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Nome:</p>
                    <p className="max-w-[180px] truncate rounded-md text-xs">{user?.name}</p>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Email:</p>
                    <p className="max-w-[180px] truncate rounded-md text-xs">{user?.email}</p>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">2FA:</p>
                    <p className="max-w-[180px] truncate rounded-md text-xs">{user?.isTwoFactor ? 'ON' : 'OFF'}</p>
                </div>
            </CardContent>
        </Card>
    )
}
