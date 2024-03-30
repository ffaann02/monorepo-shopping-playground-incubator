import { MdOutlineInventory2 } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const MyShopGameData = [
    {
        title: "จำนวนเกมที่เคยสร้างทั้งหมด",
        amounth: "8",
        unit: "คน"
    },
    {
        title: "จำนวนคนเล่นเกมทั้งหมด",
        amounth: "200",
        unit: "คน"
    },
    {
        title: "เกมสุ่มวงล้อที่เคยสร้าง",
        amounth: "3",
        unit: "เกม"
    },
    {
        title: "จำนวนคนเล่นเกมสุ่มวงล้อทั้งหมด",
        amounth: "120",
        unit: "คน"
    },
    {
        title: "เกมการ์ดความทรงจำที่เคยสร้าง",
        amounth: "2",
        unit: "เกม"
    },
    {
        title: "จำนวนคนเล่นเกมการ์ดความทรงจำทั้งหมด",
        amounth: "50",
        unit: "คน"
    },
    {
        title: "เกมตู้คีบที่เคยสร้าง",
        amounth: "3",
        unit: "เกม"
    },
    {
        title: "จำนวนคนเล่นเกมตู้คีบทั้งหมด",
        amounth: "30",
        unit: "คน"
    },
];

const MyShopGame = () => {
    return (
        <div className="flex flex-col mt-4">
            <div className="flex gap-x-2 items-center">
                <MdOutlineInventory2 className=" text-[#06C755] text-lg" />
                <p className=" font-medium">เกมในร้านของคุณ</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {MyShopGameData.map((items, index) => (
                    <div className=" col-span-1 bg-white p-4 rounded-md shadow-md">
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm font-semibold">{items.title}</p>
                            <AiOutlineQuestionCircle />
                        </div>
                        <div className="flex mt-4 gap-x-1 items-end">
                            <p className="font-semibold text-3xl">{items.amounth}</p>
                            <p className="text-lg text-gray-400 mb-0.5">{items.unit}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default MyShopGame;