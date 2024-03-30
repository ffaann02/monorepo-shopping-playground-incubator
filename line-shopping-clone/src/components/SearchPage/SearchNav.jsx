import { GrSearch } from "react-icons/gr";
import { useLocation } from "react-router-dom"
import { PiShoppingCartSimple } from "react-icons/pi";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const SearchNav = () => {
    const location = useLocation();
    const isSearchPage = location.pathname === '/Search';
    return (
        <div className={`fixed w-full px-4 pb-4 bg-white ${isSearchPage ? "block" : "hidden"}`}>

            <div className="flex justify-between pt-3 pb-4 z-10 w-full items-center">
                <Link to="/">
                    <BsChevronLeft className="text-xl" />
                </Link>
                <p className="text-[1.05rem] font-[650] text-center">LINE SHOPPING</p>
                <PiShoppingCartSimple className="text-2xl" />
            </div>
            <div className="w-full h-full relative flex">
                <GrSearch className="absolute left-2.5 top-2.5 text-xl text-gray-500" />
                <input type="text" placeholder="ค้นหาสินค้าร้านค้าเเละเพื่อนในไลน์"
                    className="w-full bg-[#f5f5f5] rounded-md px-[0.6rem] py-[0.6rem] text-sm placeholder-gray-500"
                    style={{ paddingLeft: '2.5rem' }}
                />
            </div>
        </div>
    )
}
export default SearchNav;