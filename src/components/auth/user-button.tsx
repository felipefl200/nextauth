'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/icons'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from '@/components/auth/logout-button'

export function UserButton() {
    const user = useCurrentUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="ml-2 mt-1 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || ''} alt={user?.name} />
                    <AvatarFallback>
                        <Icons.userIcon />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Preferências</DropdownMenuItem>
                <DropdownMenuItem>
                    <LogoutButton>Sair</LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
