import { IoIosArrowForward } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
const GiftGroup = [
    {
        id: "1",
        img: "https://vos.line-scdn.net/ect-mall/gift-group/2023-04-19/BD.png",
        title: "Birthday"
    },
    {
        id: "2",
        img: "https://vos.line-scdn.net/ect-mall/gift-group/top_gift2X.png",
        title: "Top Gifts"
    },
    {
        id: "3",
        img: "https://vos.line-scdn.net/ect-mall/gift-group/her.png",
        title: "For Her"
    },
    {
        id: "4",
        img: "https://vos.line-scdn.net/ect-mall/gift-group/him.png",
        title: "For Him"
    },
    {
        id: "5",
        img: "https://vos.line-scdn.net/ect-mall/gift-group/mom.png",
        title: "Mom & Kids"
    },
    {
        id: "6",
        img: "https://vos.line-scdn.net/ect-mall/gift-group/senior.png",
        title: "Seniors"
    },
    {
        id: "7",
        img: "https://vos.line-scdn.net/ect-mall/gift-group/couple.png",
        title: "Couples"
    },
    {
        id: "8",
        img: "https://vos.line-scdn.net/ect-mall/gift-group/pet.png",
        title: "Pets Lovers"
    },

]

const GiftProduct = [
    {
        img: "https://d.line-scdn.net/obs/r/ect/ect/image_169573481130636731622dd3276t124f030b",
        title: "small tote - dec 2023",
        price: "950"
    },
    {
        img: "https://d.line-scdn.net/obs/r/ect/ect/image_169573481130636731622dd3276t124f030b",
        title: "small tote - dec 2023",
        price: "950"
    },
    {
        img: "https://d.line-scdn.net/obs/r/ect/ect/image_169573481130636731622dd3276t124f030b",
        title: "small tote - dec 2023",
        price: "950"
    },
    {
        img: "https://d.line-scdn.net/obs/r/ect/ect/image_169573481130636731622dd3276t124f030b",
        title: "small tote - dec 2023",
        price: "950"
    },
    {
        img: "https://d.line-scdn.net/obs/r/ect/ect/image_169573481130636731622dd3276t124f030b",
        title: "small tote - dec 2023",
        price: "950"
    },
]

const GiftZone = () => {
    return (
        <div className="mt-10 ">
            <div className="flex justify-between px-4">
                <div className="flex items-center">
                    <img
                        className="mr-2 w-4 h-4"
                        src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-gift-blue.svg"
                    />
                    <div className="font-bold ">
                        Gift Zone ส่งของให้เพื่อนใน LINE
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-xs"> ดูทั้งหมด </div>
                    <IoIosArrowForward />
                </div>
            </div>

            <div>
                <div className="carousel carousel-center overflow-x-auto mt-4 ml-4">
                    {GiftGroup.map((item, index) => (
                        <div className="carousel-item mr-2 rounded-lg border-2 border-gray-100 bg-gray-100 w-[90px] h-[90px]">
                            <div className="flex flex-col pt-3 items-center">
                                <img
                                    className="h-10 w-10"
                                    src={item.img}
                                />
                                <div>
                                    <p className="mt-2 text-xs">{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="carousel carousel-center mt-4 ml-4 gap-x-2">
                        {GiftProduct.map((item, index) => (
                            <Link to="/Product">
                                <div className="carousel-item">
                                    <div className="flex flex-col pt-3 items-center ">
                                        <div className="relative">
                                            <img
                                                className="object-cover w-[180px] h-[180px] rounded-lg"
                                                src={item.img}
                                            />
                                            <div className="absolute top-2 left-2">
                                                <img
                                                    className="h-6 w-6"
                                                    src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-gift-badge.svg"
                                                />
                                            </div>
                                            <div className="flex justify-between mt-2 items-top w-[180px]">
                                                <p className="text-base">{item.title}</p>
                                                <FiHeart className="mt-2 ml-2 text-xl" />
                                            </div>
                                            <div>
                                                <p className="font-bold">฿{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default GiftZone;