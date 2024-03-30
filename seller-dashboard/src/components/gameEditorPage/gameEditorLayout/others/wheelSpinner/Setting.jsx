import React, { useState } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaRegTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useWheelContext } from '../../../../../contexts/WheelContext';

const couponLogo = "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/dashboard_asset%2Fcouponlogo.png?alt=media&token=dce844fb-e40a-43bd-ac6c-afc1e4557500";

const Setting = ({ setCurrentTool, giftList, setGiftList }) => {

    const {updateWheelState, setUpdateWheelState} = useWheelContext();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(giftList.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }
    const [editedGiftList, setEditedGiftList] = useState(giftList.map(gift => ({ ...gift, editing: false, editedDropRate: gift.drop_rate })));

    const handleEdit = (index) => {
        setEditedGiftList(prevState => {
            const updatedGiftList = [...prevState];
            updatedGiftList[index].editing = true;
            return updatedGiftList;
        });
    };

    

    const handleSave = (index) => {
        setEditedGiftList(prevState => {
            const updatedGiftList = [...prevState];
            updatedGiftList[index].editing = false;
            const updatedOriginalList = [...giftList];
            updatedOriginalList[index].drop_rate = updatedGiftList[index].editedDropRate;
            // Perform save operation with updatedOriginalList[index].drop_rate
            // For example, you can make an API call here
            setGiftList(updatedOriginalList);
            setUpdateWheelState({...updateWheelState, updatedOriginalList});
            return updatedGiftList;
        });
    };

    const handleChange = (event, index) => {
        let { value } = event.target;
        // If the input value is empty or non-numeric, set it to "0"
        if (value.trim() === "" || isNaN(value)) {
            value = 0;
        }
        // Convert percentage string to decimal value
        const decimalValue = parseFloat(value) / 100;

        setEditedGiftList((prevState) => {
            const updatedGiftList = [...prevState];
            updatedGiftList[index].editedDropRate = decimalValue;
            return updatedGiftList;
        });
    };



    const handleCancel = (index) => {
        setEditedGiftList(prevState => {
            const updatedGiftList = [...prevState];
            updatedGiftList[index].editing = false;
            return updatedGiftList;
        });
    };

    const toPercentageString = (value) => {
        return (value * 100);
    };

    return (
        <div>
            <p className="text-slate-500 text-sm">อัตราการสุ่ม</p>
            <p className="text-slate-500 text-xs mt-2">{giftList.length} รายการ</p>
            <div className='mt-0.5'>
                <div className="border rounded-md">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="">
                                <th className="font-semibold">ลำดับ</th>
                                <th className="font-semibold">รูป</th>
                                <th className="font-semibold">ชื่อสิ่งของ</th>
                                {/* <th>จำนวน
                                    <p className="text-[10px] text-slate-400">(คงเหลือ)</p>
                                </th> */}
                                <th className="font-semibold">เปอร์เซ็นต์</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {editedGiftList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((gift, index) => (
                                <tr key={index} className="bg-none hover:bg-green-50">
                                    <th className="text-xs font-normal">{currentPage * itemsPerPage + index + 1}.</th>
                                    <td><img src={gift.image || couponLogo} className="w-6" alt={gift.name} /></td>
                                    <td className="text-xs whitespace-normal break-words text-blue-600 hover:underline cursor-pointer">{gift.name}</td>
                                    <td>
                                        {gift.editing ? (
                                            <div className='relative'>
                                                <input
                                                    type="text"
                                                    value={toPercentageString(gift.editedDropRate)}
                                                    onChange={(event) => handleChange(event, index)}
                                                    className="text-slate-400 text-xs w-14 input-sm pl-2 border border-slate-300 rounded-md focus:border-slate-400 focus:outline-none focus:drop-shadow-md -z-0"
                                                />
                                                <p className='text-neutral-300 absolute right-2 top-[20%]'>%</p>
                                            </div>
                                        ) : (
                                            <span className='text-slate-500 flex'>{toPercentageString(gift.editedDropRate)} <p className='text-xs text-slate-400 ml-0.5 mt-[0.16rem]'>%</p></span> // Convert decimal value to percentage string
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex my-auto justify-between gap-x-4">
                                            {gift.editing ? (
                                                <>
                                                    <button className='text-xs rounded-[0.25rem] text-green-600 hover:underline' onClick={() => handleSave(index)}>บันทึก</button>
                                                    <button className='text-xs rounded-[0.25rem] text-red-600 hover:underline' onClick={() => handleCancel(index)}>ยกเลิก</button>
                                                </>
                                            ) : (
                                                <button className='text-xs rounded-[0.25rem] text-green-600 hover:underline' onClick={() => handleEdit(index)}>แก้ไข</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {0 < giftList.length && giftList.length < 3 && [...Array(3 - giftList.length)].map((_, index) => (
                                <tr key={index}>
                                    <th className="text-xs font-normal">{index + giftList.length + 1}.</th>
                                    <td colSpan={5} className='text-xs font-normal text-red-600 cursor-pointer'>
                                        *ของรางวัลอย่างน้อย 3 ชิ้น
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='mt-1'>
                    <button className="text-xs text-green-600 hover:underline ml-1"
                        onClick={() => { setCurrentTool(0) }}
                    >แก้ไขรายการ</button>
                </div>
                <div className="flex text-xs justify-end gap-x-1">
                    <button disabled={currentPage === 0}
                        className={`text-green-600 hover:underline cursor-pointer my-auto disabled:text-slate-300`}
                        onClick={handlePrevPage}>
                        <FaChevronLeft />
                    </button>
                    <p className="border-x px-2 my-auto">{currentPage + 1}</p>
                    <button disabled={currentPage === totalPages - 1}
                        className={`text-green-600 hover:underline cursor-pointer my-auto disabled:text-slate-300`}
                        onClick={handleNextPage}>
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Setting