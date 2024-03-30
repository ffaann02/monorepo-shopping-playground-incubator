import { MdArrowForwardIos } from "react-icons/md";

const wowproduct = [
    {
        product: "https://d.line-scdn.net/obs/r/ect/ect/image_1708087513601778174b5798304t130b7fc9",
        title: "Tokyo Yonars 24 ตลับ 💖 โปรเด็ดรับซัมเมอร์",
        sales: "2,399",
        price: "21,576",
        amount: "2",
        time: "70",
    },
    {
        product: "https://d.line-scdn.net/obs/r/ect/ect/image_1708087513601778174b5798304t130b7fc9",
        title: "Tokyo Yonars 24 ตลับ 💖 โปรเด็ดรับซัมเมอร์",
        sales: "2,399",
        price: "21,576",
        amount: "2",
        time: "99",
    },
    {
        product: "https://d.line-scdn.net/obs/r/ect/ect/image_1708087513601778174b5798304t130b7fc9",
        title: "Tokyo Yonars 24 ตลับ 💖 โปรเด็ดรับซัมเมอร์",
        sales: "2,399",
        price: "21,576",
        amount: "2",
        time: "60",
    },
    {
        product: "https://d.line-scdn.net/obs/r/ect/ect/image_1708087513601778174b5798304t130b7fc9",
        title: "Tokyo Yonars 24 ตลับ 💖 โปรเด็ดรับซัมเมอร์",
        sales: "2,399",
        price: "21,576",
        amount: "2",
        time: "22",
    },
];

const WowItems = () => {
    return (
        <div className="relative py-6  bg-[#f5f3fa]">
            <div className="relative flex justify-between px-4 z-10">
                <img src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/wow-item-logo.svg" />
                <MdArrowForwardIos />
            </div>
            <div className="relative carousel carousel-center mt-4 px-4 z-10 gap-x-2">
                {wowproduct.map(item => (
                    <div className="carousel-item">
                        <div >
                            <div className="relative">
                                <img className="relative h-28 w-28 rounded-md"
                                    src={item.product} />
                                <div className="absolute bg-gradient-to-r from-[#3e9ce7] to-[#1EC687] px-2 py-0.5 rounded-bl-md bottom-0">
                                    <div className=" flex gap-x-1">
                                        <img
                                            src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-badge-selected.svg" />
                                        <img
                                            src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/badge-selected-text.svg" />
                                    </div>
                                </div>
                            </div>
                            <div className="flax flex-col mt-1">
                                <div className="w-28">
                                    <p className="truncate text-sm">{item.title}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-[#8250FF]">฿{item.sales}</p>
                                    <p className="font-semibold text-sm line-through text-gray-200">฿{item.price}</p>
                                    <div className="flex gap-x-1">
                                        <img src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/wow-item-clock.svg" />
                                        <p className="text-[11px]">{item.amount} ชิ้นสุดท้าย!</p>
                                    </div>
                                    <div className="w-full h-1 bg-gray-200 rounded overflow-hidden mt-2">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#8250FF] to-[#1EC687] transition-all duration-500"
                                            style={{ width: `${item.time}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bg-white w-full h-36 bottom-0 z-0" />
        </div>
    )
}

export default WowItems;