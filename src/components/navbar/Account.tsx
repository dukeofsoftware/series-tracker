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
import { AiFillHeart, AiOutlineLogout } from "react-icons/ai"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaUser, FaList } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5"
import { Button } from '../ui/button'
import Link from 'next/link'
interface AccountProps {
    username?: string | null
    profileImage?: string | null
    userId?: string | null
}
import { SignOutButton } from "@clerk/nextjs";

const Account: FC<AccountProps> = ({ username, profileImage, userId }) => {

    const userConfig = [
        {
            name: "Profile",
            href: `/user/${username}`,
            icon: FaUser,
            iconClass: "w-4 h-4 mr-2 text-sky-500"
        },
        {
            name: "My List",
            href: `/user/${username}/lists`,
            icon: FaList,
            iconClass: "w-4 h-4 mr-2 text-yellow-500"
        },
        {
            name: "Favorites",
            href: `/user/${username}/favorites`,
            icon: AiFillHeart,
            iconClass: "w-4 h-4 mr-2 text-red-500",

        },
        {
            name: "Settings",
            href: `/user-profile`,
            icon: IoSettingsSharp,
            iconClass: "w-4 h-4 mr-2"
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
                        <item.icon className={item.iconClass} />
                        <Link href={item.href}>
                            {item.name}
                        </Link>
                    </DropdownMenuItem>
                ))
            }


            <DropdownMenuSeparator />
            <SignOutButton>

                <DropdownMenuItem className='font-bold text-red-500'>

                    <AiOutlineLogout className="mr-2 h-4 w-4" /> Sign out

                </DropdownMenuItem>
            </SignOutButton>


        </DropdownMenuContent>
    </DropdownMenu >
}

export default Account