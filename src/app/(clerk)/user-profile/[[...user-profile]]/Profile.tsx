'use client'

import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from '@clerk/themes';

const Profile = ({}) => {
    const { theme } = useTheme()

  return <div className="flex justify-center mt-12 md:mt-24">
       <UserProfile path="/user-profile" routing="path"
            appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
            }} />
  </div>
}

export default Profile