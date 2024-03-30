import { IoIosArrowForward } from "react-icons/io";
import { MdListAlt } from "react-icons/md";
import { CiHeart, CiShop, CiGift } from "react-icons/ci";

const Header = () => {
    return (
        <div className="bg-white-300 mt-28">

            <div className="flex justify-center pt-6">
                <img
                    src="https://i.ibb.co/gZ5Gyn1/blank-profile-picture-973460-960-720.webp"
                    className="rounded-full h-14 w-14"
                />
            </div>

            <div className="flex flex-col items-center justify-center mt-3 ">
                <p className="text-xl font-bold">Latif Danai</p>
                <div className="flex mt-1 item-center justify-center">
                    <div className=" my-auto">
                        <div className=" rounded-full h-4 w-4 bg-[#06c655] text-white font-bold">
                            <div className="ms-1  text-xs">P</div>
                        </div>
                    </div>
                    <p className="mx-1 text-base font-bold">0</p>
                    <p className="mx-1 text-slate-500 text-base">(Equals to ฿0)</p>
                    <IoIosArrowForward className="my-auto w-3 h-3" />
                </div>
            </div>

            <div className="flex item-center justify-center mt-8 px-7">
                <div className="flex w-full h-full grid-col-4 ">
                    <div className="mx-auto">
                        <CiHeart className="mx-auto  text-2xl"/>
                        <p className="mx-auto mt-1 text-xs text-slate-600">Wishlist</p>
                    </div>
                    <div className="mx-auto">
                        <CiShop className="mx-auto text-2xl"/>
                        <p className="mx-auto mt-1 text-xs text-slate-600">Following</p>
                    </div>
                    <div className="mx-auto">
                        <MdListAlt className="mx-auto text-2xl"/>
                        <p className="mx-auto mt-1 text-xs text-slate-600">My Order</p>
                    </div>
                    <div className="mx-auto">
                        <CiGift className="mx-auto text-2xl"/>
                        <p className="mx-auto mt-1 text-xs text-slate-600">My Gift</p>
                    </div>
                </div>
            </div>

            <hr className="border-t-1 border-slate-100 mt-7" />
        </div>
    )
}

export default Header;