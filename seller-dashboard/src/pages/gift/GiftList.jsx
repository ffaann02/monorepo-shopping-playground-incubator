import { useEffect, useState } from "react"
import { useDataFetch } from "../../hooks/useDataFetch"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const GiftList = () => {

    const navigate = useNavigate();

    const [giveaways, setGiveaways] = useState(null);

    const { fetchData } = useDataFetch();

    useEffect(() => {
        fetchData("/product/get-giveaways-list")
            .then(response => {
                console.log(response);
                setGiveaways(response);
            })
            .catch(error => {
                console.error("Error fetching giveaways-list:", error);
            });
    }, [])

    return (
        <div>
            {giveaways &&
                <div className="pl-24 pr-40 pt-6 pb-10 text-slate-700">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p className="text-2xl font-semibold">รายการของแถม</p>
                            <p className="text-blue-600 text-sm hover:underline cursor-pointer">วิธีนำเข้ารายการของแถม</p>
                        </div>

                        <div className="flex gap-x-1.5">
                            {/* <button className="text-green-600 px-2 py-2.5 h-fit border border-green-500 rounded-[5px] hover:bg-green-50">
                                แบ่ง
                            </button> */}
                            <button className="text-green-600 px-2 py-2.5 h-fit border border-green-500 rounded-[5px] hover:bg-green-50"
                                onClick={()=>navigate("/reward/gift/add")}>
                                สร้างรายการของแถม
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-8 flex justify-between">
                        <div className="grid grid-cols-5 w-1/2">
                            <div className="col-span-3 w-full relative">
                                <input
                                    type="text"
                                    placeholder="ค้นหาของชื่อของแถม, หมวดหมู่"
                                    className="w-full text-sm rounded-[4px] border border-slate-300 px-3 py-2 text-slate-500
                            focus:outline-none placeholder:text-slate-300"/>
                                <p className="absolute top-2.5 right-3 text-green-600 hover:text-slate-500 cursor-pointer text-sm">ค้นหา</p>
                            </div>
                            {/* <button className="text-green-600 border ml-2 border-green-500 rounded-[4px]">
                            <p>hello</p>
                        </button> */}
                        </div>
                    </div>
                    <p className="mt-4 text-slate-500">{giveaways.length} รายการ</p>
                    <div className="text-right w-full flex justify-end mt-2">
                        <div className="flex gap-x-3">
                            <button className="my-auto disabled:text-slate-400" disabled={true}>
                                <FiArrowLeft />
                            </button>
                            <p className="my-auto text-xs">{giveaways.length} / {giveaways.length}</p>
                            <button className="my-auto disabled:text-slate-400" disabled={true}>
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="w-full bg-white drop-shadow-sm rounded-md mt-2 py-2">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className="border-b-2 border-slate-100">
                                    <tr className="text-md font-normal">
                                        <th>
                                            <div>
                                                <input type="checkbox" defaultChecked className="checkbox checkbox-sm rounded-sm
                                             border-slate-300 checked:border-green-600 [--chkbg:theme(colors.green.600)] [--chkfg:white]" />
                                            </div>
                                        </th>
                                        <th className="font-normal text-[16px]">ลำดับ</th>
                                        <th className="font-normal text-[16px]">ชื่อรายการ</th>
                                        <th className="font-normal text-[16px]">หมวดหมู่</th>
                                        <th className="font-normal text-[16px]">จำนวนคงเหลือ</th>
                                        <th className="font-normal text-[16px]">ราคา</th>
                                        <th className="font-normal text-[16px]"></th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {/* row 1 */}
                                    {giveaways.map((giveaway, index) => (
                                        <tr className="text-center border-0">
                                            <th>
                                                <div>
                                                    <input type="checkbox" defaultChecked className="checkbox checkbox-sm rounded-sm
                                             border-slate-300 checked:border-green-600 [--chkbg:theme(colors.green.600)] [--chkfg:white]" />
                                                </div>
                                            </th>
                                            <td className="text-left text-slate-600">{index + 1}.</td>
                                            <td className="text-left text-blue-600 hover:underline cursor-pointer">
                                                <div className="flex">
                                                    <img src={giveaway.image} className="w-10 border rounded-md" />
                                                    <p className="ml-2 my-auto">{giveaway.name}</p>
                                                </div>
                                            </td>
                                            <td className="text-left text-slate-600">{giveaway.category.name}</td>
                                            <td className="text-left text-slate-600">{giveaway.amount}</td>
                                            <td className="text-left text-slate-600">{giveaway.price}</td>
                                            <td>
                                                <PiDotsThreeOutlineVerticalFill className="text-slate-500 hover:text-green-600 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))}
                                    {/* row 2 */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex">

                        </div>
                    </div>
                </div>}
        </div>
    )
}
export default GiftList