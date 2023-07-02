import Navs from "./Navs"
import RightNav from "./RightNav"
import SearchBar from "./SearchBar"
import { currentUser } from '@clerk/nextjs';

const Navbar = async () => {
    const user = await currentUser();
    return (
        <nav className=" flex items-center gap-3 justify-between container py-5">
            <div className="flex items-center">
                <h3>
                    Series Tracker
                </h3>
                <Navs />
            </div>
            <SearchBar />
            <RightNav profileImage={user!.profileImageUrl!} username={user!.username!}/>
        </nav>
    )
}

export default Navbar