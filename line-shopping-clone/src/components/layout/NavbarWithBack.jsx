import { useLocation } from "react-router-dom"
import { BsChevronLeft } from "react-icons/bs";
import { LuUpload } from "react-icons/lu";
import { PiShoppingCartSimple, PiUploadSimple } from "react-icons/pi";
import { Link } from "react-router-dom";

const NavbarWithBack = () => {
    const location = useLocation();
    const isShopPage = location.pathname === '/Shop';
    const isBuyProduct = location.pathname === '/Product';

    return (
        <div className={`pr-5 ${(isBuyProduct||isShopPage) ? "block" : "hidden"}`}>
            <div className="fixed pt-3 pb-3 pr-8 z-10 w-full flex justify-between bg-white">
                <Link to="/">
                    <BsChevronLeft className="text-2xl ml-2.5" />
                </Link>
                {/* <p className="text-[1.05rem] font-[650] text-center">LINE SHOPPING</p> */}
                <div className="text-2xl flex gap-x-4">
                    <PiUploadSimple className="" />
                    <PiShoppingCartSimple className="" />
                </div>
            </div>
            {/* <div className="w-full h-full relative flex">
                <input type="text" placeholder="ค้นหาสินค้าและร้านค้าในไลน์"
                    className="w-full bg-[#f5f5f5] rounded-md px-[0.6rem] py-[0.6rem] text-sm placeholder-black" />
                <GrSearch className="absolute right-2.5 top-2.5 text-xl" />
            </div> */}
        </div>
    )
}
export default NavbarWithBack