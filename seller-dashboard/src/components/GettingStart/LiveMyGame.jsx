import { CgMediaLive } from "react-icons/cg";

const LiveData = [
    {
        title: "ระยะเวลาไลฟ์รวม",
        data: "300",
        unit: "ชั่วโมง"
    },
    {
        title: "คนดูเฉลี่ย",
        data: "150",
        unit: "คน"
    },
    {
        title: "จำนวนเกมที่สร้างระหว่างไลฟ์",
        data: "50",
        unit: "เกม"
    },
    {
        title: "จำนวนคนเล่นเกมสุ่มวงล้อในไลฟ์",
        data: "30",
        unit: "คน"
    },
    {
        title: "จำนวนคนเล่นเกมการ์ดความจำในไลฟ์",
        data: "12",
        unit: "คน"
    },
    {
        title: "จำนวนคนเล่นเกมตู้คีบในไลฟ์",
        data: "8",
        unit: "คน"
    },
];

const LiveMyGame = () => {
    return (
        <div className="">
            <div className="flex mt-4 items-center gap-x-2">
                <CgMediaLive className="text-[#06C755] text-lg" />
                <p className="font-medium">สถิติระหว่างไลฟ์</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {LiveData.map((items, index) => (
                    <div className=" col-span-1 bg-white p-4 rounded-md shadow-md">
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm font-semibold">{items.title}</p>

                        </div>
                        <div className="flex mt-4 gap-x-1 items-end">
                            <p className="font-semibold text-3xl">{items.data}</p>
                            <p className="text-lg text-gray-400 mb-0.5">{items.unit}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default LiveMyGame;