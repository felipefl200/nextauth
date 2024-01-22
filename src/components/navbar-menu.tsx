'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { UserButton } from './auth/user-button'

export function NavbarMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/client" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(navigationMenuTriggerStyle(), 'bg-slate-50 dark:bg-slate-900/50')}
                        >
                            Client
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/server" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(navigationMenuTriggerStyle(), 'bg-slate-50 dark:bg-slate-900/50')}
                        >
                            Server
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/admin" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(navigationMenuTriggerStyle(), 'bg-slate-50 dark:bg-slate-900/50')}
                        >
                            Admin
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/settings" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(navigationMenuTriggerStyle(), 'bg-slate-50 dark:bg-slate-900/50')}
                        >
                            Configurações
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <UserButton />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
