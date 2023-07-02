'use client'
import { FC } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import Link from 'next/link'
interface AccountProps {
    username: string | null
    profileImage: string | null
}

const Account: FC<AccountProps> = ({ username, profileImage }) => {

    const userConfig = [
        {
            name: "Profile",
            href: `/user/${username}`
        },
        {
            name: "My List",
            href: `/user/${username}/lists`
        },
        {
            name: "Favorites",

            href: `/user/${username}/favorites`
        },
        {
            name: "Settings",
            href: `/user-profile`
        },

    ]

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost">

                <Avatar className='mr-2 h-8 w-8 border border-slate-200'>
                    <AvatarImage src={profileImage as string} />
                    <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                {username}
            </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
                userConfig.map((item, index) => (
                    <DropdownMenuItem key={index}>
                        <Link href={item.href}>
                            {item.name}
                        </Link>
                    </DropdownMenuItem>
                ))
            }


            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default Account