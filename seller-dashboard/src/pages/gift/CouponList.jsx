import React, { useState, useEffect } from 'react'
import { useDataFetch } from '../../hooks/useDataFetch';
import { useNavigate } from 'react-router-dom';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Coupon = () => {

    const navigate = useNavigate();

    const [coupons, setCoupons] = useState(null);

    const { fetchData } = useDataFetch();

    useEffect(() => {
        fetchData("/mysql/get-all-coupons")
            .then(response => {
                console.log(response);
                setCoupons(response);
            })
            .catch(error => {
                console.error("Error fetching coupons list:", error);
            });
    }, [])

    return (
        <div>
            {coupons &&
                <div className="pl-24 pr-40 pt-6 pb-10 text-slate-700">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p className="text-2xl font-semibold">รายการคูปอง</p>
                            <p className="text-blue-600 text-sm hover:underline cursor-pointer">วิธีนำเข้ารายการคูปอง</p>
                        </div>

                        <div className="flex gap-x-1.5">
                            {/* <button className="text-green-600 px-2 py-2.5 h-fit border border-green-500 rounded-[5px] hover:bg-green-50">
                                แบ่ง
                            </button> */}
                            <button className="text-green-600 px-2 py-2.5 h-fit border border-green-500 rounded-[5px] hover:bg-green-50"
                                onClick={()=>navigate("/reward/coupon/add")}>
                                สร้างรายการคูปอง
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-8 flex justify-between">
                        <div className="grid grid-cols-5 w-1/2">
                            <div className="col-span-3 w-full relative">
                                <input
                                    type="text"
                                    placeholder="ค้นหาคูปอง"
                                    className="w-full text-sm rounded-[4px] border border-slate-300 px-3 py-2 text-slate-500
                            focus:outline-none placeholder:text-slate-300"/>
                                <p className="absolute top-2.5 right-3 text-green-600 hover:text-slate-500 cursor-pointer text-sm">ค้นหา</p>
                            </div>
                            {/* <button className="text-green-600 border ml-2 border-green-500 rounded-[4px]">
                            <p>hello</p>
                        </button> */}
                        </div>
                    </div>
                    <p className="mt-4 text-slate-500">{coupons.length} รายการ</p>
                    <div className="text-right w-full flex justify-end mt-2">
                        <div className="flex gap-x-3">
                            <button className="my-auto disabled:text-slate-400" disabled={true}>
                                <FiArrowLeft />
                            </button>
                            <p className="my-auto text-xs">{coupons.length } / {coupons.length}</p>
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
                                        <th className="font-normal text-[16px]">คูปอง</th>
                                        <th className="font-normal text-[16px]">วันที่เริ่ม</th>
                                        <th className="font-normal text-[16px]">วันสิ้นสุด</th>
                                        <th className="font-normal text-[16px]">จำนวนคงเหลือ</th>
                                        <th className="font-normal text-[16px]">มูลค่า(บาท)</th>
                                        <th className="font-normal text-[16px]"></th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {/* row 1 */}
                                    {coupons.map((giveaway, index) => (
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
                                                    <p className="ml-2 my-auto">{giveaway.code}</p>
                                                </div>
                                            </td>
                                            <td className="text-left text-slate-600">{giveaway.startDate.date}</td>
                                            <td className="text-left text-slate-600">{giveaway.endDate.date}</td>
                                            <td className="text-left text-slate-600">{giveaway.quantity}</td>
                                            <td className="text-left text-slate-600">{giveaway.value}</td>
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

export default Coupon