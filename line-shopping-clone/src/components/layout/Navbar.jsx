import { GrSearch } from "react-icons/gr";
import { useLocation } from "react-router-dom"
import { PiShoppingCartSimple } from "react-icons/pi";

const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isMy = location.pathname === '/My';

    return (
        <div className={`px-4 bg-white ${isHomePage ? "block":"hidden"}`}>
            <div className="flex justify-between pt-3 pb-7 z-10 w-full">
                <div/>
                <p className="text-[1.05rem] font-[650] text-center">LINE SHOPPING</p>
                <PiShoppingCartSimple className="text-2xl"/>
            </div>
            <div className="w-full h-full relative flex">
                <input type="text" placeholder="ค้นหาสินค้า ร้านค้า เเละเพื่อนในไลน์"
                    className="w-full bg-[#f5f5f5] rounded-md px-[0.6rem] py-[0.6rem] text-sm placeholder-black" />
                <GrSearch className="absolute right-2.5 top-2.5 text-xl" />
            </div>
        </div>
    )
}
export default Navbar