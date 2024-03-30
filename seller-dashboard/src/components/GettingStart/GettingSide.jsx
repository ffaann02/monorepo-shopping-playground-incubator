import { RiLiveFill } from "react-icons/ri";
import { FaGamepad, FaFacebook } from "react-icons/fa6";

import { FaLine } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";

const GettingSide = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 bg-white shadow-md p-4 gap-4 rounded-md">
                <div className="relative col-span-1 my-auto">
                    <RiLiveFill className="text-7xl text-[#4cc765] mx-auto" />
                    <FaGamepad className="absolute top-6 right-3 z-10 text-6xl" />
                </div>
                <div className="col-span-2">
                    <p className="text-md font-bold">SHOPPING Playground Live</p>
                    <p>เพิ่มยอดคนดู LINE SHOPPING LIVE ด้วย SHOPPING Playground Live ที่สามารถสร้างเกมเล่นระหว่างไลฟ์</p>
                </div>
            </div>

            <div className="bg-white shadow-md p-4 rounded-md ">
                <h2 className="font-bold">เรียกลูกค้าได้ 24 ชั่วโมง เริ่มเเชร์ลิงก์เกมของคุณ!</h2>
                <p className="mt-2">โปรโมตร้านค้าของคุณผ่านการเเชร์ลิงก์เกมของคุณเพื่อเพิ่มยอดลูกค้าของคุณ</p>
                <input className="border border-gray-300 mt-2 py-1.5 px-2 w-full bg-slate-100 rounded-md items-center"
                    type="text" readOnly={true} value="https://shop.line.me/@941djewm"
                    onClick={(e) => {
                        e.target.select();
                        document.execCommand('copy');
                    }}
                />
                <div className="grid grid-cols-4 w-full mt-8">
                    <div className="flex col-span-1 justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <img
                                className="h-12 w-12"
                                src="https://i.ibb.co/4RbNwMM/LINE-APP-Android.png"
                            />
                            <p className="font-medium text-gray-600">LINE</p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col items-center gap-4">
                            <FaFacebook className="w-full text-blue-500 text-5xl" />
                            <p className="font-medium text-gray-600">Facebook</p>
                        </div>
                    </div>
                    <div className="flex col-span-1 justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="rounded-full bg-black h-12 w-12 justify-center">
                                <BsTwitterX className="text-white w-full h-full p-2" />
                            </div>
                            <p className="font-medium text-gray-600">Twitter</p>
                        </div>
                    </div>
                    <div className="flex col-span-1 justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="rounded-full bg-gray-200 h-12 w-12 justify-center">
                                <IoIosLink className="text-gray-600 w-full h-full p-3" />
                            </div>
                            <p className="font-medium text-gray-600">Copy URL</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-white shadow-md p-4 rounded-md ">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 w-full">
                            <div className="relative flex flex-col rounded-md h-28 bg-green-500 justify-center">
                                <p className="text-white font-bold text-lg ml-2 mb-4">SHOPPING Playground</p>
                                <div className="absolute flex py-1 bg-green-600 rounded-b-md justify-center bottom-0 w-full">
                                    <p className="text-sm text-white font-semibold">Support</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col col-span-2 justify-between">
                            <h2 className="font-bold text-xl">Contact Support</h2>
                            <p>ทีมสนับสนุน SHOPPING Playground พร้อมที่จะช่วยเหลือคุณโดยคลิกที่นี่เพื่อติดต่อเรา</p>
                        </div>
                    </div>
            </div>

        </div>
    )
};
export default GettingSide;