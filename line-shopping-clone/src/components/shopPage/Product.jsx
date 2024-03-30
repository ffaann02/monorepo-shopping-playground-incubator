import ProductCard from "../layout/ProductCard"
import { VscArrowSwap } from "react-icons/vsc";
import { IoIosGift } from "react-icons/io";


const GiftIconMedium = () => {
    return (
        <div className="bg-[#00d8ff] w-5 h-5 flex rounded-full drop-shadow-sm">
            <IoIosGift className="text-white ml-[0.18rem] mt-0.5 text-[14px] drop-shadow-sm"/>
        </div>
    )
}

export const GiftIconLarge = () => {
    return (
        <div className="bg-[#00d8ff] w-6 h-6 flex rounded-full drop-shadow-sm">
            <IoIosGift className="text-white mt-0.5 ml-1 text-[16px] drop-shadow-sm"/>
        </div>
    )
}

const Product = () => {
    return (
        <div className="w-full h-full bg-white pt-10 mt-4">
            <p className="text-[15px] font-bold pb-3 px-4">Product</p>
            <div className="w-full flex px-4 border-t-[0.5px] justify-between pt-6 pb-4 ">
                <div className="flex gap-x-1.5">
                    <button className="text-[#111111] border-[0.5px] rounded-sm font-bold text-xs px-3 py-2 flex">
                        <p className="my-auto">Popular</p> <VscArrowSwap className="rotate-90 my-auto ml-2" />
                    </button>
                    <button className="text-[#111111] bg-[#f5f5f5] rounded-sm font-normal text-xs px-2 py-2 flex">
                        <GiftIconMedium/> <p className="my-auto ml-1">SEND GIFT</p>
                    </button>
                </div>
                <p className="text-[#777777] text-xs my-auto">65 Products</p>
            </div>
            <div className="px-4 grid grid-cols-2 gap-3" id="product-container">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}
export default Product