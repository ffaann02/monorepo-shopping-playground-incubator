import { useLocation } from "react-router-dom"
import { BsChevronLeft } from "react-icons/bs";
import { PiShoppingCartSimple,PiUploadSimple } from "react-icons/pi";

const ExploreNav = () => {
    return (
        <div className="pl-2.5 pr-5">
            <div className="fixed top-0 left-0 pt-3 px-3 z-[200] w-full flex justify-between bg-white">
                <BsChevronLeft className="text-xl" />
                <div className="font-bold text-base ">
                    <p>Event</p>
                </div>
                <div className="text-2xl pr-2 flex gap-x-4">
                    <PiShoppingCartSimple />
                </div>
            </div>
        </div>

    )
}
export default ExploreNav;