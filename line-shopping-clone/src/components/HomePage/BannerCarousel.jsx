import React, { useState, useEffect } from 'react';

const Banner = [
    {
        item:"banner1",
        src: "https://vos.line-scdn.net/ect-mall/upload/2a804906-175b-4bab-9004-5c43587e8827.png",
    },
    {
        item:"banner2",
        src: "https://vos.line-scdn.net/ect-mall/upload/9783c6bf-6304-4193-85fb-5905f7dd14b2.png",
    },
    {
        item:"banner3",
        src: "https://vos.line-scdn.net/ect-mall/upload/79099074-53b6-4fab-a926-2dc8aab9cffd.png",
    },
    {
        item:"banner4",
        src: "https://vos.line-scdn.net/ect-mall/upload/d9bf9518-90a4-42f1-865d-1c9c64a2e413.jpg",
    },
]

const BannerCarousel = () => {
    const [activeItem, setActiveItem] = useState('banner1');

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
    }
    return (
        <div className="relative py-2 bg-neutral rounded-box overflow-x-hidden">
            <div className="carousel carousel-center overflow-x-auto px-4">
                {Banner.map((item, index) => (
                    <div id={item.item} className="carousel-item w-full mr-2">
                        <img
                            src={item.src}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
            <div className="absolute top-4 right-6 rounded-full px-2 py-0,5 bg-black bg-opacity-40">
                <p className="text-white text-[12px]">1/3</p>
            </div>

        </div>
    )
}

export default BannerCarousel;
