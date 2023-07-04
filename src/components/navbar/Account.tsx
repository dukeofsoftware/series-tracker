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
        <DropdownMenuTrigger className='p-2 hidden hover:bg-slate-500/20 rounded-md duration-200 md:flex justify-center items-center'>


            <Avatar className='mr-2 h-8 w-8 border border-slate-200'>
                <AvatarImage src={profileImage as string} />
                <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
            <p className='block'>{username}</p>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
                userConfig.map((item, index) => (
                    <DropdownMenuItem key={index}>
                        <Link href={item.href} className='flex '>
                            <item.icon className={item.iconClass} />

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