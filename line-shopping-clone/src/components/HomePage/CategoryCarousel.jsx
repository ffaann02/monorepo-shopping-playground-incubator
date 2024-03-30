import { useState } from 'react';
import { GoDotFill } from "react-icons/go";

const CategoryData = [
    {
        
        item : "item1",
        src1 : "https://vos.line-scdn.net/ect-mall/upload/b28c53a6-380f-40a2-b76e-38722a4576b1.png",
        title1_1 : "PAYDAY",
        title1_2 : "แจกโค้ดลับ",
        src2 : "https://vos.line-scdn.net/ect-mall/upload/ecc4f04d-efc0-41b8-8cd1-b6835db8db65.png",
        title2_1 : "ช้อปรับพอยท์",
        title2_2 : "",
        src3 : "https://vos.line-scdn.net/ect-mall/upload/c945eeb7-3dc1-4e68-9ec3-cbdd084a98a5.png",
        title3_1 : "FREE",
        title3_2 : "SHIPPING",
        src4 : "https://vos.line-scdn.net/ect-mall/upload/27cfd308-04b7-4063-88c6-853adfce0c9f.png",
        title4_1 : "เปิดร้านค้า",
        title4_2 : "พร้อมผู้ช่วย",
    },
    {
        id : "2",
        item : "item2",
        src1 : "https://vos.line-scdn.net/ect-mall/upload/a2a092f4-4285-494a-8b50-800d31088e54.png",
        title1_1 : "ช้อปประกันภัย",
        title1_2 : "ได้พอยท์ 10%",
        src2 : "https://vos.line-scdn.net/ect-mall/upload/cff98b85-07fa-4f69-96a4-a72febb5baaa.png",
        title2_1 : "ดาวน์โหลด",
        title2_2 : "แอป MyShop",
        src3 : "https://vos.line-scdn.net/ect-mall/upload/c00639a5-5259-43c4-813c-0fa4d98970d2.png",
        title3_1 : "Mom&Kid",
        title3_2 : "Social Club",
        src4 : "https://vos.line-scdn.net/ect-mall/upload/a6f8b7e5-a2d9-4f02-89dd-16efd9283393.png",
        title4_1 : "Item",
        title4_2 : "สายเเฟสุดป๊อป!",
    },
    {
        id : "3",
        item : "item3",
        src1 : "https://vos.line-scdn.net/ect-mall/upload/33e4bfe0-ce7f-41b6-8144-6a505b8a09af.png",
        title1_1 : "บิวตี้อินเทรนด์",
        title1_2 : "และสุขภาพ",
        src2 : "https://vos.line-scdn.net/ect-mall/upload/0cf6d3cd-0f1d-48bb-9265-7f983f33a699.png",
        title2_1 : "อร่อยฟิน",
        title2_2 : "ได้ทุกวัน",
        src3 : "https://vos.line-scdn.net/ect-mall/upload/dd3ad105-78d9-42f8-8802-0823a487b1d5.png",
        title3_1 : "HOME & ",
        title3_2 : "LIVING...",
        src4 : "https://vos.line-scdn.net/ect-mall/upload/36d5fdd5-481c-4410-ac0c-820f27899508.jpg",
        title4_1 : "Item IT",
        title4_2 : "มีแล้วชีวิตดี๊ดี",
    },
    {
        id : "4",
        item : "item4",
        src1 : "https://vos.line-scdn.net/ect-mall/upload/543a332b-8028-4d07-b944-8fd8bc7279a7.png",
        title1_1 : "สินค้ามาแรง",
        title1_2 : "ประจำวัน",
        src2 : "https://vos.line-scdn.net/ect-mall/upload/c0166756-b495-491b-9c71-892198ea75ed.png",
        title2_1 : "ร้านฮิต สาย",
        title2_2 : "เฮลท์ตี้",
        src3 : "https://vos.line-scdn.net/ect-mall/upload/d8964b0c-75a5-4847-8aec-8ce03d41aa77.png",
        title3_1 : "BAG",
        title3_2 : "ไอเทมสุดป๊อป",
        src4 : "https://vos.line-scdn.net/ect-mall/upload/e09670ca-0b7f-41cb-84b6-4252acd0e491.jpg",
        title4_1 : "พิกัด",
        title4_2 : "มูเตลูไอเทม",
    },
]

const CateCarousel = () => {
    const [activeItem, setActiveItem] = useState('item1','item2','item3','item4');

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
    }

    return (
        <div className="mt-3 px-1">
            <div className="carousel w-full overflow-x-hidden">
                {CategoryData.map((item, index)=>(
                <div id={item.item} className="carousel-item w-full">
                    <div className="grid grid-cols-4 gap-x-3 justify-items-center mx-3.5">
                        <div className="flex flex-col items-center">
                            <div className="w-[52px] h-[52px] ">
                                <img src={item.src1} />
                            </div>
                            <div className="mt-2 text-[12px] text-gray-500 text-center">
                                <div>{item.title1_1}</div>
                                <div>{item.title1_2}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-[52px] h-[52px]">
                                <img src={item.src2} />
                            </div>
                            <div className="mt-2 text-[12px] text-gray-500 text-center">
                                <div>{item.title2_1}</div>
                                <div>{item.title2_2}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-[52px] h-[52px]">
                                <img src={item.src3} />
                            </div>
                            <div className="mt-2 text-[12px] text-gray-500 text-center">
                                <div>{item.title3_1}</div>
                                <div>{item.title3_2}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-[52px] h-[52px]">
                                <img src={item.src4} />
                            </div>
                            <div className="mt-2 text-[12px] text-gray-500 text-center">
                                <div>{item.title4_1}</div>
                                <div>{item.title4_2}</div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            <div className="flex justify-center w-full py-2 gap-0.5">
                <a href="#item1" className={`btn btn-xs rounded-full text-[12px] 
                ${activeItem === 'item1' ? 'text-gray-500' : 'text-gray-200'}`}
                    onClick={() => handleItemClick('item1')}>
                    <GoDotFill />
                </a>
                <a href="#item2" className={`btn btn-xs rounded-full text-[12px] 
                ${activeItem === 'item2' ? 'text-gray-500' : 'text-gray-200'}`}
                    onClick={() => handleItemClick('item2')}>
                    <GoDotFill />
                </a>
                <a href="#item3" className={`btn btn-xs rounded-full text-[12px] 
                ${activeItem === 'item3' ? 'text-gray-500' : 'text-gray-200'}`}
                    onClick={() => handleItemClick('item3')}>
                    <GoDotFill />
                </a>
                <a href="#item4" className={`btn btn-xs rounded-full text-[12px] 
                ${activeItem === 'item4' ? 'text-gray-500' : 'text-gray-200'}`}
                    onClick={() => handleItemClick('item4')}>
                    <GoDotFill />
                </a>
            </div>
        </div>
    )
}

export default CateCarousel;