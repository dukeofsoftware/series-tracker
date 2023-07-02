"use client"
import {

    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from '@clerk/themes';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Account from "./Account";
import { FC } from "react";
interface RightNavProps {
    username: string | null
    profileImage: string | null
}

const RightNav: FC<RightNavProps> = ({ username, profileImage }) => {

    const { theme, setTheme } = useTheme()

    return (
        <div className="flex  items-center justify-end gap-2">
            <SignedIn>
                <Account username={username} profileImage={profileImage} />
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <Link href={"/auth/login"} className={cn(buttonVariants({ variant: "ghost" }))} >
                    Sign In
                </Link>
            </SignedOut>
            <DropdownMenu>
                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
                    {
                        theme === "dark" ? <BsFillMoonFill className="w-4 h-4" /> : <BsFillSunFill className="w-4 h-4 
                        text-yellow-500" />
                    }
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        <BsFillSunFill className="w-4 h-4 mr-2" />  Light Mode
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}><BsFillMoonFill className="w-4 h-4 mr-2" />Dark Mode</DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

        </div >
    )
}

export default RightNav