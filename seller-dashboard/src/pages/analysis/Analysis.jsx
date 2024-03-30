import { VictoryPie, VictoryChart, VictoryLine } from "victory"
import { BsFilterLeft } from "react-icons/bs";

const sampleData = [
    { x: "วงล้อ", y: 60 },
    { x: "ตู้คีบ", y: 30 },
    { x: "จับคู่ภาพ", y: 10 }
]

const frameData = [
    [
        { x: "ธ.ค. 65", y: 30 },
        { x: "ม.ค. 66", y: 35 },
        { x: "ก.พ. 66", y: 33 },
    ],
    [
        { x: "ธ.ค. 65", y: 30 },
        { x: "ม.ค. 66", y: 38 },
        { x: "ก.พ. 66", y: 45 },
    ]
]
const testData = [
    { x: "ธ.ค. 65", y: 30 },
    { x: "ม.ค. 66", y: 35 },
    { x: "ก.พ. 66", y: 33 },
]

const Analysis = () => {
    return (
        <div className="px-24 py-16 text-slate-700">
            <p className="text-2xl font-semibold">เครื่องมือวิเคราะห์</p>
            <p className="text-md font-thin font-sans flex">เห็นถึงความสัมพันธ์ของข้อมูล และปรับแก้ให้ตรงจุด
            </p>
            <div className="w-full grid grid-cols-12 gap-x-4 mt-4">
                <div className="w-full col-span-8 bg-white rounded-md drop-shadow-sm">
                    <p className="ml-4 mt-3 text-xl font-semibold">เปรียบเทียบการยอดขายสินค้ารวม</p>
                    <p className="ml-4 text-sm text-slate-500 mt-0.5">ระหว่างการซื้อปกติ กับ การซื้อหลังเล่นเกมเสร็จ</p>
                    <div className="">
                        <VictoryChart minDomain={{ y: 0 }}>
                            <VictoryLine
                                data={frameData[0]} // Assuming data is an array of arrays, each containing data points for a line
                                style={{ frameData: { stroke: "#c43a31", strokeWidth: 1 } }}
                            />
                            <VictoryLine
                                data={frameData[1]} // Assuming data is an array of arrays, each containing data points for a line
                                style={{ frameData: { stroke: "blue", strokeWidth: 1 } }}
                            />
                        </VictoryChart>
                    </div>
                </div>
                <div className="w-full col-span-4 bg-white rounded-md drop-shadow-sm h-fit">
                    <div className="flex justify-between">
                        <div>
                            <p className="ml-4 mt-3 text-xl font-semibold">เกมที่ลูกค้าคุณสนใจ</p>
                            <p className="ml-4 text-xs text-slate-500 mt-1">ข้อมูลเมื่อ 1 เดือนที่ผ่านมา</p>
                        </div>
                        <BsFilterLeft className="text-3xl mr-4 mt-4 text-slate-600" />

                    </div>
                    <div className="p-2">
                        <VictoryPie
                            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                            data={sampleData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Analysis