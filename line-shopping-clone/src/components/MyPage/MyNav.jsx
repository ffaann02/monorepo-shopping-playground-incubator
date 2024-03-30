import { useLocation } from "react-router-dom"
import { BsChevronLeft } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { LuUpload } from "react-icons/lu";
import { PiShoppingCartSimple, PiUploadSimple } from "react-icons/pi";

const MyNav = () => {
    return (
        <div className="pl-2.5 pr-1 ">
            <div className="fixed top-0 left-0 z-[2000] pt-3 pb-3 w-full flex justify-between bg-white">
                <BsChevronLeft className="text-2xl" />
                <div className="text-2xl flex gap-x-4">
                    <AiOutlineSetting />
                    <PiShoppingCartSimple className="text-2xl" />
                    <HiOutlineDotsVertical className="text-xl my-auto mx-1" />
                </div>
            </div>

        </div>
    )
}

export default MyNav;