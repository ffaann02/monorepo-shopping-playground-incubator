import { useEffect, useState } from "react"
import { useMemoryContext } from "../../../../../contexts/MemoryContext"
import { useDataFetch } from "../../../../../hooks/useDataFetch";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaRegTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEditorShareContext } from "../../../../../contexts/EditorShareContext";

const GiftListMemory = ({ gameId }) => {

    const { fetchDataWithParams } = useDataFetch();
    const { giftList, setGiftList,devMode,setDevMode,flipAllCards } = useMemoryContext();
    const [giftType, setGiftType] = useState('item');
    const { isImportGiftList, setIsImportGiftList} = useEditorShareContext();
    useEffect(()=>{
        flipAllCards(false);
      },[])
    // item, discount, both
    useEffect(() => {
        if (gameId) {
            fetchDataWithParams("/mysql/get-selected-giveaways", { gameId })
                .then(response => {
                    setGiftList(response);
                })
                .catch(error => {
                    console.error("Error fetching selected giveaways:", error);
                })
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = giftList ? Math.ceil(giftList.giveaway.length / itemsPerPage) : 1;

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div>
            {giftList && <div className="mt-1 pl-1 pr-0.5">
                <p className="text-slate-500 text-sm">ประเภทรางวัล</p>
                <div className="flex gap-x-6 mt-2">
                    <div className="flex">
                        <input type="radio" className="radio radio-sm radio-success" checked={giftType === 'item'}
                            onChange={() => setGiftType('item')}
                        />
                        <p className="text-slate-500 ml-2 text-xs mt-1">สิ่งของ</p>
                    </div>
                    <div className="flex">
                        <input type="radio" className="radio radio-sm radio-success" checked={giftType === 'discount'}
                            onChange={() => setGiftType('discount')}
                        />
                        <p className="text-slate-500 ml-2 text-xs mt-1">ส่วนลด</p>
                    </div>
                    <div className="flex">
                        <input type="radio" className="radio radio-sm radio-success" checked={giftType === 'both'}
                            onChange={() => setGiftType('both')}
                        />
                        <p className="text-slate-500 ml-2 text-xs mt-1">รวมทั้งสอง</p>
                    </div>
                </div>
                {giftType === 'item' && <div className="mt-4">
                    <p className="text-xs text-slate-500 ml-0.5 mt-4">{giftList.giveaway.length} รายการ</p>
                    <div className="border rounded-md">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="">
                                    <th className="font-semibold">ลำดับ</th>
                                    <th className="font-semibold">รูป</th>
                                    <th className="font-semibold">ชื่อสิ่งของ</th>
                                    <th className="font-semibold">สต็อก</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-x-scroll">
                                {giftList.giveaway.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((gift, index) => (
                                    <tr className="bg-none hover:bg-green-50">
                                        <th className="text-xs font-normal">{currentPage*itemsPerPage + index + 1}</th>
                                        <td><img src={gift.image} className="w-6" /></td>
                                        <td className="text-xs whitespace-normal break-words text-blue-600 hover:underline cursor-pointer">{gift.name}</td>
                                        <td className="text-xs">{gift.amount}</td>
                                        <td className="">
                                            <div className="flex justify-end my-auto gap-x-2">
                                                <FaRegTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer" />
                                                <BiDotsVerticalRounded className="text-slate-500 hover:text-slate-600 text-lg cursor-pointer -mt-0.5" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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

            </div>}
        </div>
    )
}
export default GiftListMemory