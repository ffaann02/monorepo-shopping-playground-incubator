import { IoGameController } from "react-icons/io5";

// #4068cb
// #e3eaf4
// #fbaba4
// #facdcc
// #ffea91


const suggestions = [
    {
        id: 1,
        title: "เกมแบบไหนเหมาะกับร้านของคุณ",
        thumbnail_icon: <IoGameController className="text-[3rem] text-[#ffea91]" />,
        description: "เลือกเกมให้เหมาะสมกับกลุ่มลูกค้า และประเภทสินค้า สร้างประสบการณ์ที่ดีกว่าเดิม",
        url: "/game-suggestion"
    },
    // {
    //     id: 1,
    //     title: "เกมแบบไหนเหมาะกับร้านของคุณ",
    //     thumbnail_icon: <IoGameController className="text-[3rem] text-[#ffea91]" />,
    //     description: "เลือกเกมให้เหมาะสมกับกลุ่มลูกค้า และประเภทสินค้า สร้างประสบการณ์ที่ดีกว่าเดิม",
    //     url: "/game-suggestion"
    // }
]

const Suggestion = () => {
    return (
        <div className="">
            {suggestions.map((suggestion, index) => (
                <div className="grid grid-cols-3 gap-x-3 bg-white p-4 rounded-md drop-shadow-sm mb-4">
                    <div className="col-span-1 bg-[#e3eaf4] px-2 py-4 justify-center flex w-full h-fit
                        border-4 border-[#7ea1fa] rounded-lg">
                        <div className="bg-[#bccfff] p-2 rounded-full h-fit">
                            {suggestion.thumbnail_icon}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <p className="text-md font-medium">{suggestion.title}</p>
                        <p className="text-sm text-slate-400">{suggestion.description}</p>
                        <p className="mt-1 text-blue-600 cursor-pointer hover:underline">เรียนรู้เพิ่มเติม</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Suggestion