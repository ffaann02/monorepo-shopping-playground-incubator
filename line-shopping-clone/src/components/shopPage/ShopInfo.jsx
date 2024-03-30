import { FiMoreVertical } from "react-icons/fi";
import { IoPersonAddOutline } from "react-icons/io5";
import CustomerShopProfile from "./CustomerShopProfile";

const ShopInfo = () => {
    return (
        <div className="px-4 w-full">
            <div className="flex gap-x-2.5">
                <img src="https://down-th.img.susercontent.com/file/8e4485b7b2bac2cabbc637dbfe2d7525"
                    className="w-[50px] h-[50px] rounded-full" />
                <div className="flex flex-col gap-y-1 my-auto">
                    <p className="text-[14px] font-bold">Shop Name</p>
                    <div className="flex gap-x-2">
                        <p className="text-xs font-normal text-[#777777]">100 Friends</p>
                        <p className="text-xs font-normal text-[#777777]">20 items sold</p>
                    </div>
                </div>
            </div>
            <div className="mt-3 w-full grid grid-cols-11 text-xs gap-x-1">
                <button className="text-white bg-[#1ec687] rounded-md col-span-5 py-1.5 font-bold">Follow</button>
                <button className="text-[#111111] bg-slate-50 border-[1px] rounded-md col-span-5 py-1.5 font-bold flex justify-center">
                    <IoPersonAddOutline className="text-[16px] mr-1 flipped-icon"/>
                    Add Friend
                </button>
                <button className="text-[#111111] bg-slate-50 border-[1px] rounded-md col-span-1 py-1.5 font-bold justify-center flex">
                    <FiMoreVertical />
                </button>
            </div>
            {/* <CustomerShopProfile/> */}
        </div>
    )
}
export default ShopInfo