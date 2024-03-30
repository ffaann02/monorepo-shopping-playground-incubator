import { MdArrowForwardIos } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const ProductShop = () => {
    return (
        <div className="flex flex-col pt-3 pb-80 px-4 bg-white">
            <Link to="/Shop">
                <div className="flex w-full gap-x-2 ">
                    <div>
                        <div className="rounded-full bg-red-200 w-11 h-11"></div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="flex justify-between items-start w-full">
                            <div className="flex flex-col">
                                <p className="text-sm text-black font-medium">Today@ThisisAmerica</p>
                                <p className=" text-xs text-gray-400">22.5K Friends ∙ 1K+ items sold</p>
                            </div>
                            <div className="flex justify-end items-center text-[#1dd053]">
                                <p className=" text-xs font-medium">Go to shop</p>
                                <MdArrowForwardIos className="text-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex flex-col w-full mt-2 rounded-md ">
                <div className="flex justify-between items-center rounded-md bg-emerald-100 bg-opacity-80 py-3 px-3">
                    <div className="flex items-center gap-x-2  text-zinc-700">
                        <RiLock2Fill className="text-md" />
                        <p className="text-xs font-medium">Secure Payment</p>
                    </div>
                    <MdArrowForwardIos className="text-sm" />
                </div>
                <div className="flex justify-center items-center rounded-md py-3 px-3 border-2 mt-2">
                    <div className="flex items-center gap-x-1  text-zinc-700">
                        <IoChatbubbleEllipsesOutline className="text-xs" />
                        <p className="text-xs font-bold">Chat with seller</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductShop;