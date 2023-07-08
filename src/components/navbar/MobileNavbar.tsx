'use client'

import { useNavbarStore } from "@/hooks/use-navbar";
import { AiFillHeart, AiOutlineCloseCircle, AiOutlineLogout } from "react-icons/ai"
import { FaUser, FaList } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5"
import { FC, useEffect } from 'react'
import { User } from "@clerk/nextjs/dist/types/server";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

interface MobileNavbarProps {
    username: User["username"]
    userId: User["id"]

}
const MobileNavbar: FC<MobileNavbarProps> = ({ username, userId }) => {
    const path = usePathname()
    const { theme, setTheme } = useTheme()
    const navbar = useNavbarStore()
    const userConfig = [
      
        {
            name: "My List",
            href: `/user/${username}/list`,
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
        },]
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.35
            }
        }
    }

    const animationItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }
    const themeAnimation = {
        hidden: {
            x: -20,
            y: 20
        },
        show: {
            x: 0,
            y: 0,
        },
        exit: {
            x: -20,
            y: -20

        }


    }
    useEffect(() => {
        if (navbar.isNavbarOpen) document.body.classList.add("overflow-hidden")
        else document.body.classList.remove("overflow-hidden")


    }, [navbar.isNavbarOpen])
    useEffect(() => {

        if (navbar.isNavbarOpen) {
            navbar.closeNavbar()
        }

    }, [path])
    if (!navbar.isNavbarOpen) return null


    return (<AnimatePresence>
        <motion.nav className="container fixed inset-0 bg-white/90 dark:bg-black/90 z-50 " initial={"hidden"} animate={"show"} exit={"hidden"} variants={container}>
            <div className="flex items-center justify-between py-5 mb-2">
                <Link href={"/"} className="text-sm md:text-lg   font-semibold md:font-bold">
                    Series Tracker
                </Link>
                <div className="flex items-center gap-2 justify-end">
                    <Button variant={"ghost"} size={"icon"} className="h-11 w-11" onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark")

                    }}>
                        {
                            theme === "dark" ?
                                <AnimatePresence>
                                    <motion.span key={"theme"} className="overflow-hidden "
                                        variants={themeAnimation}
                                        exit={{
                                            x: 20,
                                            y: -20
                                        }}
                                        initial={"hidden"}
                                        animate={"show"}

                                    >
                                        <BsFillMoonFill className="w-4 h-4" />
                                    </motion.span>
                                </AnimatePresence>
                                :
                                <AnimatePresence>
                                    <motion.span key={"theme"} className="overflow-hidden "
                                        variants={themeAnimation}
                                        exit={"exit"}
                                        initial={"hidden"}
                                        animate={"show"}>
                                        <BsFillSunFill className="w-4 h-4                    text-yellow-500" />
                                    </motion.span>
                                </AnimatePresence>
                        }
                        <p className="sr-only">Change theme</p>
                    </Button>
                    <Button variant={"ghost"} size={"icon"} className="h-11 w-11" onClick={() => navbar.closeNavbar()}>
                        <AiOutlineCloseCircle className="w-7 h-7 " />
                        <p className="sr-only">Close</p>
                    </Button>
                </div>
            </div>
            <ul className="flex flex-col ">
                {userId ? userConfig.map((item, index) => (
                    <motion.div key={index} variants={animationItem}>
                        <li className="w-full py-5">
                            <Link href={item.href} key={index} className={cn(buttonVariants({ variant: "link" }), "flex items-center justify-center py-3  text-lg font-semibold ")}>
                                <item.icon className={item.iconClass} />
                                {item.name}
                            </Link>
                        </li>
                        <Separator />
                    </motion.div>

                )) : (
                    <div className="flex items-center">
                        <Link href={"/auth/login"} className={cn(buttonVariants({ variant: "default" }))}>
                            Login
                        </Link>
                        <Link href={"/auth/register"} className={cn(buttonVariants({ variant: "outline" }))}>
                            Sign Up
                        </Link>

                    </div>
                )}
            </ul>
        </motion.nav>
    </AnimatePresence >)



}

export default MobileNavbar