import Link from "next/link";
import Navs from "./Navs"
import RightNav from "./RightNav"
import SearchBar from "./SearchBar"
import { currentUser } from '@clerk/nextjs';
import MobileNavbar from "./MobileNavbar";

const Navbar = async () => {
    const user = await currentUser();

    return (
        <>
            <header className=" flex items-center gap-3 justify-between container py-5 z-30">
                <div className="flex items-center">
                    <Link href={"/"} className="hidden md:block text-lg   font-semibold md:font-bold">
                        Series Tracker
                    </Link>
                    <Navs />
                </div>
                <SearchBar />
                <RightNav profileImage={user && user!.profileImageUrl!} username={user && user!.username!} userId={user && user!.id} />
            </header>
            <MobileNavbar user={user} />
        </>
    )
}

export default Navbar