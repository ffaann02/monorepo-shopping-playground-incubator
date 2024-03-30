import React, { useState } from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaRegTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEditorShareContext } from '../../../../../contexts/EditorShareContext';
import ModalGiftListImport from '../../shared/ModalGiftListImport';

const GiftList = ({ giftType, setGiftType, giftList, setGiftList,setImportingGiftList }) => {

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(giftList.length / itemsPerPage);
    // const totalPages = 1;
    const { isImportGiftList, setIsImportGiftList } = useEditorShareContext();

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const maxDiscoumt = 5;

    return (
        <div>
            <ModalGiftListImport giftList={giftList} setGiftList={setGiftList}/>
            <p className="text-slate-500 text-sm">ประเภทรางวัล</p>
            <div className="mt-2 flex gap-x-6 mb-4">
                <div className="flex w-fit">
                    <input type="radio"
                        onChange={() => {
                            setGiftType('item');
                        }}
                        className="radio radio-sm radio-success"
                        checked={giftType === 'item'} />
                    <label className="ml-2 mt-1 text-xs text-slate-500">สิ่งของ</label>
                </div>
                <div className="flex w-fit">
                    <input type="radio"
                        onChange={() => {
                            setGiftType('discount');
                        }}
                        className="radio radio-sm radio-success"
                        checked={giftType === 'discount'} />
                    <label className="ml-2 mt-1 text-xs text-slate-500">ส่วนลด</label>
                </div>
            </div>
            <p className="text-xs text-slate-500 ml-0.5 mt-4">{giftList.length} รายการ</p>
            {giftType === 'item' &&
                <div className="border rounded-md">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="">
                                <th className="font-semibold">ลำดับ</th>
                                <th className="font-semibold">รูป</th>
                                <th className="font-semibold">ชื่อสิ่งของ</th>
                                <th className="font-semibold">สต็อก</th>
                                <th className="font-semibold">คงเหลือ</th>
                                <th></th>
                            </tr>
                        </thead>
                        {giftList.length >= 3 &&
                            <tbody className="">
                                {giftList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((gift, index) => (
                                    <tr key={index} className="bg-none hover:bg-green-50">
                                        <th className="text-xs font-normal">{currentPage * itemsPerPage + index + 1}.</th>
                                        <td><img src={gift.image} className="w-6" /></td>
                                        <td className="text-xs whitespace-normal break-words text-blue-600 hover:underline cursor-pointer">{gift.name}</td>
                                        <td className="text-xs">{gift.amount}</td>
                                        <td className="text-xs">{gift.giveaway_amount}</td>
                                        <td className="">
                                            <div className="flex justify-end my-auto gap-x-2">
                                                <FaRegTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer" />
                                                <BiDotsVerticalRounded className="text-slate-500 hover:text-slate-600 text-lg cursor-pointer -mt-0.5" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>}
                        {0 < giftList.length && giftList.length < 3 && <tbody className="ิ">
                            {giftList.map((gift, index) => (
                                <tr key={index} className="bg-none hover:bg-green-50">
                                    <th className="text-xs font-normal">{currentPage * itemsPerPage + index + 1}.</th>
                                    <td><img src={gift.image} className="w-6" /></td>
                                    <td className="text-xs whitespace-normal break-words text-blue-600 hover:underline cursor-pointer">{gift.name}</td>
                                    <td className="text-xs">{gift.amount}</td>
                                    <td className="text-xs">{gift.giveaway_amount}</td>
                                    <td className="">
                                        <div className="flex justify-end my-auto gap-x-2">
                                            <FaRegTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer" />
                                            <BiDotsVerticalRounded className="text-slate-500 hover:text-slate-600 text-lg cursor-pointer -mt-0.5" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {0 < giftList.length < 3 && [...Array(3 - giftList.length)].map((_, index) => (
                                <tr key={index + giftList.length}>
                                    <th className="text-xs font-normal">{index + giftList.length + 1}.</th>
                                    <td colSpan={5} className='text-xs font-normal text-green-600 hover:underline cursor-pointer'>เพิ่มของรางวัล</td>
                                </tr>
                            ))}
                        </tbody>}
                        {giftList.length === 0
                            && <tbody className="">
                                {0 < giftList.length < 3 && [...Array(3)].map((_, index) => (
                                    <tr key={index}>
                                        <th className="text-xs font-normal">{index + 1}.</th>
                                        <td colSpan={5} className='text-xs font-normal text-green-600 hover:underline cursor-pointer'>เพิ่มของรางวัล</td>
                                    </tr>
                                ))}
                            </tbody>}

                    </table>
                </div>}
            {giftType === 'item' && (
                <div className='flex justify-between'>
                    <div className='mt-1'>
                        <button className="text-xs text-green-600 hover:underline ml-1" 
                        onClick={() => {
                            document.getElementById('modal_import_gift_list').showModal();
                            setIsImportGiftList(true);
                        }
                            }>นำเข้ารายการของรางวัล +</button>
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
            )}
            {giftType === 'discount' &&
                <div className="border rounded-md">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="">
                                <th className="font-semibold">ลำดับ</th>
                                <th className="font-semibold">รหัสคูปอง</th>
                                <th className="font-semibold">สต็อก</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="overflow-x-scroll">
                            {giftList.map((gift, index) => (
                                <tr key={index} className="bg-none hover:bg-green-50">
                                    <th className="text-xs font-normal">{index + 1}.</th>
                                    <td className="text-xs whitespace-normal break-words text-blue-600 hover:underline cursor-pointer">{gift.name}</td>
                                    <td className="text-xs">{gift.quantity}</td>
                                    <td className="">
                                        <div className="flex justify-end my-auto gap-x-2">
                                            <FaRegTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer" />
                                            <BiDotsVerticalRounded className="text-slate-500 hover:text-slate-600 text-lg cursor-pointer -mt-0.5" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {[...Array(maxDiscoumt - giftList.length)].map((_, index) => (
                                <tr key={index + giftList.length}>
                                    <th className="text-xs font-normal">{index + giftList.length + 1}.</th>
                                    <th className='text-xs font-normal text-green-600 hover:underline cursor-pointer'>เพิ่มคูปอง</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>}
        </div>
    )
}
export default GiftList