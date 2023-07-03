import Link from "next/link";
import Navs from "./Navs"
import RightNav from "./RightNav"
import SearchBar from "./SearchBar"
import { currentUser } from '@clerk/nextjs';

const Navbar = async () => {
    const user = await currentUser();
    return (
        <nav className=" flex items-center gap-3 justify-between container py-5 z-30">
            <div className="flex items-center">
                <Link href={"/"} className="text-lg font-bold">
                    Series Tracker
                </Link>
                <Navs />
            </div>
            <SearchBar />
            <RightNav profileImage={user && user!.profileImageUrl!} username={user && user!.username!} userId={user && user!.id}/>
        </nav>
    )
}

export default Navbar