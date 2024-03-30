import { GoHomeFill,GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdCompass } from "react-icons/io";
import { IoPersonOutline,IoPerson } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom"


const MenuBar = () => {
    const location = useLocation();
    const isMyPage = location.pathname === "/My";
    const isBuyProductPage = location.pathname === "/Product";
    const isSearchPage = location.pathname === "/Search";
    const isGamePage = location.pathname.startsWith('/game');
    const isLivePage = location.pathname.startsWith('/live');

    return (
        <div className={`fixed z-[2000] w-full bottom-0 text-center
         ${isMyPage ? 'bg-gray-50' : 'bg-white'}
          ${(!isBuyProductPage && !isSearchPage) ? "block" : "hidden"} 
          ${isGamePage ? 'hidden' : 'block'} ${isLivePage ? 'hidden' : 'block'}`}>
            <div className="w-full h-full py-2 px-4 grid grid-cols-4">
                <Link to="/">
                    <div className="mx-auto text-black">
                        {location.pathname == "/" ? (
                            <GoHomeFill className="mx-auto text-2xl" />
                        ) : (
                            <GoHome className="mx-auto text-2xl" />
                        )}
                        <p className="text-xs">Home</p>
                    </div>
                </Link>
                <Link to="/Search">
                    <div className="mx-auto text-black">
                        <IoIosSearch className="mx-auto text-2xl" />
                        <p className="text-xs">Search</p>
                    </div>
                </Link >
                <Link to="/Explore">
                    <div className="mx-auto text-black">
                        {location.pathname == "/Explore" ? (
                            <IoMdCompass className="mx-auto text-2xl" />
                        ) : (
                            <MdOutlineExplore className="mx-auto text-2xl" />
                        )}
                        <p className="text-xs stroke-">Explore</p>
                    </div>
                </Link>
                <Link to="/My">
                    <div className="mx-auto text-black">
                        {location.pathname == "/My" ? (
                            <IoPerson className="mx-auto text-2xl" />
                        ) : (
                            <IoPersonOutline className="mx-auto text-2xl" />
                        )}
                        <p className="text-xs">My</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default MenuBar;