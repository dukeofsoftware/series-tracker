"use client"
import {

    SignedIn,
    SignedOut,

} from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
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
    username?: string | null
    profileImage?: string | null
    userId?: string | null
}
import { RxHamburgerMenu } from "react-icons/rx"
import { useNavbarStore } from "@/hooks/use-navbar";
const RightNav: FC<RightNavProps> = ({ username, profileImage, userId }) => {

    const { theme, setTheme } = useTheme()
    const navbar = useNavbarStore()

    return (
        <>
            <div className="hidden md:flex items-center justify-end gap-2">
                <SignedIn>
                    <Account username={username} profileImage={profileImage} userId={userId} />
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
            <div className="flex md:hidden items-center justify-end gap-2 ml-2">
                <Button variant={"ghost"} size={"icon"} className="h-11 w-11" onClick={() => navbar.toggleNavbar()}>
                    <RxHamburgerMenu className="w-7 h-7 " />
                    <p className="sr-only">open navbar</p>

                </Button>
            </div>

        </>

    )
}

export default RightNav