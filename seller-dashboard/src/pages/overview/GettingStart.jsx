import MyShopGame from "../../components/GettingStart/MyShopGame";
import GettingSide from "../../components/GettingStart/GettingSide";
import LiveMyGame from "../../components/GettingStart/LiveMyGame";

const GettingStart = () => {
    return (
        <div className="ms-36 mr-60 mt-8 h-full pb-10">
            <div className="flex-col">
                <p className=" text-2xl font-bold">Welcome, TEST INCUBATOR4</p>
                <p className="mt-4">ใช้ SHOPPING Playground สิ! เครื่องมือที่จะช่วยเพิ่มยอดขายเเละฐานลูกค้าให้คุณ</p>
            </div>
            <div className="grid grid-cols-3 gap-x-4 mt-8">
                <div className="col-span-2">

                    <div className="relative bg-gradient-to-br from-blue-500 to-[#4cc765] rounded-md p-4 ">
                        <p className="font-bold text-white text-xl">ระบบ Gamification ช่วยในเรื่องของการตลาดอย่างไร?</p>
                        <p className="text-gray-50 mt-2 mr-44">Gamification Marketing ถ้าอธิบายง่าย ๆ เลยก็คือการออกแบบกิจกรรมทางการตลาดให้มีลักษณะคล้ายกับการเล่นเกม
                            ไม่ว่าจะเป็น ระบบคะแนน, การจัดลำดับ รวมไปถึงของรางวัลสำหรับผู้ชนะ ซึ่งจะช่วยให้ผู้บริโภครู้สึกสนุก ลุ้น ตื่นเต้นเหมือนกับกำลังเล่นเกมอยู่นั่นเอง
                        </p>
                        <div className="flex mt-6">
                            <div className="flex py-2 px-4 border-2 rounded-md bg-white text-center">
                                อ่านเพิ่มเติม
                            </div>
                        </div>
                        <img
                            className="absolute right-2 bottom-2 h-44 w-48"
                            src="https://i.ibb.co/JQjymLt/gamebanner.png"
                        />
                    </div>
                    <MyShopGame />
                    <LiveMyGame />

                </div>
                <div className="col-span-1">
                    <GettingSide />
                </div>
            </div>
        </div>
    )
}
export default GettingStart;