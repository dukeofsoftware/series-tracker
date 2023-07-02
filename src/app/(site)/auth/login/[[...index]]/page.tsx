"use client"
import { SignIn } from "@clerk/nextjs"
import { dark } from '@clerk/themes';
import { useTheme } from "next-themes";

export default function Page() {
    const { theme } = useTheme()

    return <div className="flex items-center justify-center min-h-screen"><SignIn
        appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
        }}
        afterSignInUrl={'/'}
        afterSignUpUrl={'/'}

    />
    </div>
}