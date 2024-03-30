import { useState } from 'react';
import { GoDotFill } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { PiUploadSimple } from "react-icons/pi";
import { RiFileList2Line } from "react-icons/ri";
import { BsChevronRight } from "react-icons/bs";


const ProductDetail = [
    {
        id: "item1",
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_169573481130636731622dd3276t124f030b",
    },
    {
        id: "item2",
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_17030484289376551326c6b1105t12be9bdc",
    },
    {
        id: "item3",
        src: "https://d.line-scdn.net/obs/r/ect/ect/image_170306955834887735922dc7536t12beee66",
    },
]

const ProductCarousel = () => {
    const [activeItem, setActiveItem] = useState('item1');

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
    }
    return (
        <div className="pt-10 bg-white">
            <div className="relative">
                <div className="carousel w-full pt-16">
                    {ProductDetail.map((item, index) => (
                        <div id={item.id} className="carousel-item w-full">
                            <img src={item.src}
                                className="w-full h-[390px] object-cover" />
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                    <div className="flex justify-center w-full py-2 gap-0.5">
                        <a href="#item1" className={`btn btn-xs rounded-full text-[12px] 
                ${activeItem === 'item1' ? 'text-black' : 'text-gray-500'}`}
                            onClick={() => handleItemClick('item1')}>
                            <GoDotFill />
                        </a>
                        <a href="#item2" className={`btn btn-xs rounded-full text-[12px] 
                ${activeItem === 'item2' ? 'text-black' : 'text-gray-500'}`}
                            onClick={() => handleItemClick('item2')}>
                            <GoDotFill />
                        </a>
                        <a href="#item3" className={`btn btn-xs rounded-full text-[12px] 
                ${activeItem === 'item3' ? 'text-black' : 'text-gray-500'}`}
                            onClick={() => handleItemClick('item3')}>
                            <GoDotFill />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-4 mx-4">
                <div className="flex justify-between ">
                    <p>small tote - dec 2023</p>
                    <div className="flex gap-x-4 text-2xl">
                        <FiHeart />
                        <PiUploadSimple />
                    </div>
                </div>
                <div>
                    <p className="font-bold text-xl mt-1">฿950</p>
                </div>
                <div className="flex mt-6 justify-between">
                    <div className="flex items-center">
                        <RiFileList2Line />
                        <p className="text-sm mx-2">Variations</p>
                    </div>
                    <div className=" flex bg-gray-100 rounded-full items-center px-3 py-2">
                            <p className="text-xs">beige tan, birthday sprinkle, linen bl....</p>
                            <BsChevronRight className="text-xs"/>
                    </div>
                </div>
            </div>
            <hr className="mt-3 mx-4 border-gray-100"></hr>
        </div>
    )
}

export default ProductCarousel;