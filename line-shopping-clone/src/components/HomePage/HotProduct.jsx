import { MdKeyboardArrowDown } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

const HotProductList = [
    {
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_167567144218408760922df4602t111cde82",
        shop: "Shop's product",
        name: "Product title incubate for collecting environment",
        price: "129"
    },
    {
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_167567144218408760922df4602t111cde82",
        shop: "Shop's product",
        name: "Product title incubate for collecting environment",
        price: "129"
    },
    {
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_167567144218408760922df4602t111cde82",
        shop: "Shop's product",
        name: "Product title incubate for collecting environment",
        price: "129"
    },
    {
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_167567144218408760922df4602t111cde82",
        shop: "Shop's product",
        name: "Product title incubate for collecting environment",
        price: "129"
    },
    {
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_167567144218408760922df4602t111cde82",
        shop: "Shop's product",
        name: "Product title incubate for collecting environment",
        price: "129"
    },
    {
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_167567144218408760922df4602t111cde82",
        shop: "Shop's product",
        name: "Product title incubate for collecting environment",
        price: "129"
    },
    {
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_167567144218408760922df4602t111cde82",
        shop: "Shop's product",
        name: "Product title incubate for collecting environment",
        price: "129"
    },
    {
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_167567144218408760922df4602t111cde82",
        shop: "Shop's product",
        name: "Product title incubate for collecting environment",
        price: "129"
    },
]

const HotProduct = () => {
    return (
        <div className="mt-2 px-4 pb-80">
            <div>
                <div className="flex flex-col justify-start">
                    <p className="text-lg font-bold">สินค้ามาเเรงประจำวัน</p>
                    <div className="flex gap-x-2">
                        <div className="flex mt-3 bg-gray-100 items-center rounded-[3px] px-3 py-2">
                            <p className="text-sm">หมวดหมู่</p>
                            <MdKeyboardArrowDown />
                        </div>
                        <div className="flex mt-3 bg-gray-100 items-center rounded-[3px] px-3 py-2 gap-x-1">
                            <img src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-line-point.svg" />
                            <p className="text-xs">LINE POINTS</p>
                        </div>
                        <div className="flex mt-3 bg-gray-100 items-center rounded-[3px] px-3 py-2 gap-x-1">
                            <img
                                src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-gift-badge.svg"
                                className="h-5 w-5" />
                            <p className="text-xs">SEND GIFT</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-start mt-4">
                    <div className="flex flex-wrap h-full gap-x-4">
                        {HotProductList.map((item, index) => (
                            <div className="flex flex-col mt-4">
                                <div className="relative rounded-lg h-[170px] w-[170px]">
                                    <img
                                        className="w-full h-full object-cover rounded-lg "
                                        src={item.src}
                                    />
                                    <img
                                        className="absolute top-2 left-2 h-6 w-6"
                                        src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-gift-badge.svg"
                                    />
                                    <img
                                        className="absolute bottom-0 rounded-bl-lg"
                                        src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/selected-trust-badge.svg"
                                    />
                                </div>
                                <div className="flex flex-col justify-between items-start w-[170px] mt-2">
                                    <p className="text-xs text-gray-400 font-medium">{item.shop}</p>
                                    <p className="text-sm font-normal mt-1">{item.name}</p>
                                    <p className=" text-base font-bold">฿{item.price}</p>
                                    <img className="mt-3"
                                        src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-line-point-text.svg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HotProduct;