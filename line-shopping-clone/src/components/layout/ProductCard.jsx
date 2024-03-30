import { GiftIconLarge } from "../shopPage/Product"
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
const ProductCard = () => {
  return (
    <div className="">
        <div className="bg-[#f8f8f8] h-[170px] rounded-md border-[0.1px] relative">
            <div className="absolute top-2 left-2">
            <GiftIconLarge/>
            </div>
            <img src="https://jirapornfood.com/wp-content/uploads/2021/12/M02-solardried-banana-original-flavor-jiraporn-%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%95%E0%B8%B2%E0%B8%81.png"
                className="object-cover"/>
        </div>
        <div className="flex justify-between py-2">
            <p className="text-sm">กล้วยตากสุดอร่อยเหาะที่สุดในโลก</p>
            <IoMdHeartEmpty className="mb-auto mt-0 text-[2rem]"/>
        </div>
        <div className="gap-y-0.5 flex flex-col">
            <p className="text-sm text-[#FF334B] font-semibold" id="original_price">฿12</p>
            <p className="text-sm text-[#b7b7b7] font-semibold line-through" id="original_price">฿20</p>
        </div>
    </div>
  )
}
export default ProductCard