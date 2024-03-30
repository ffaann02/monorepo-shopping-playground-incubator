import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useEditorShareContext } from "../../../../contexts/EditorShareContext";
import { useDataFetch } from "../../../../hooks/useDataFetch";
import { useMemoryContext } from "../../../../contexts/MemoryContext";
import { FaRegTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ModalGiftListImport = ({ giftList, setGiftList }) => {

    const { isImportGiftList, setIsImportGiftList } = useEditorShareContext();
    const { fetchData } = useDataFetch();
    const [importedGiftList, setImportedGiftList] = useState(null);
    const [updatedGiftList, setUpdatedGiftList] = useState([]);
    const { gameId } = useParams();
    useEffect(() => {
        if (giftList) {
            setUpdatedGiftList(giftList.giveaway);
        }
    }, [giftList])
    const { insertDataWithParams } = useDataFetch();

    useEffect(() => {
        if (isImportGiftList) {
            fetchData("/product/get-giveaways-list")
                .then(response => {
                    setImportedGiftList(response);
                })
                .catch(error => {
                    console.error("Error fetching selected giveaways:", error);
                })
        }
    }, [isImportGiftList])


    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = importedGiftList ? Math.ceil(importedGiftList.length / itemsPerPage) : 1;

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const isProductImported = (productId) => {
        return updatedGiftList.some(item => parseInt(item.productId) === productId);
    }

    const handleCheckboxChange = (productId) => {
        const isInGiftList = updatedGiftList.some(item => item.productId === productId);
        if (isInGiftList) {
            const updatedList = updatedGiftList.filter(item => item.productId !== productId);
            setUpdatedGiftList(updatedList);
        } else {
            const product = importedGiftList.find(item => item.productId === productId);
            if (product) {
                // Include necessary fields and add additional fields with default values
                const { amount, image, name, price, inventoryId, productId, variantsId } = product;
                const updatedProduct = {
                    amount,
                    drop_rate: null,
                    gameId: gameId,
                    giveaway_amount: amount,
                    id: -1, // -1 = add new waiting for auto-increment by sql
                    image,
                    inventoryId,
                    name,
                    price,
                    productId,
                    variantsId,
                };
                const updatedList = [...updatedGiftList, updatedProduct];
                setUpdatedGiftList(updatedList);
            }
        }
    }

    const handleSubmit = () => {
        console.log("submit")
        setGiftList({ ...giftList, giveaway: updatedGiftList });
        setIsImportGiftList(false);
        setCurrentPage(0);
        document.getElementById('modal_import_gift_list').close();
        // Update to SQL
        const data = {
            gameId: gameId,
            giveLists: updatedGiftList
        }
        insertDataWithParams('/mysql/update-selected-giveaways', data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error("Error get game setting:", error);
            });

    }

    const handleCancel = () => {
        setIsImportGiftList(false);
        document.getElementById('modal_import_gift_list').close();
    }
    return (
        <>
            {<dialog id="modal_import_gift_list" className={`modal`}>
                <div className="modal-box max-w-2xl overflow-hidden bg-slate-50">
                    <form method="dialog" className="absolute right-2 top-2">
                        <button className="text-sm text-slate-400 h-fit hover:bg-slate-100 p-2 rounded-full"
                            onClick={() => { setIsImportGiftList(false) }}>
                            <ImCross className="" />
                        </button>
                    </form>
                    <h3 className="font-semibold text-xl">รายการสินค้าของแถมจากร้าน MyShop ของคุณ</h3>
                    <p className="text-blue-600 text-xs hover:underline cursor-pointer">เพิ่มรายการของแถม</p>
                    {importedGiftList && <div className="mt-4">
                        <div className="flex justify-between my-auto">
                            <p className="text-sm mb-0.5 text-slate-500">{importedGiftList.length} รายการ</p>
                            <p className="text-xs my-auto text-slate-500 mr-0.5">{currentPage + 1} / {totalPages}</p>
                        </div>
                        <div className="overflow-x-auto bg-white rounded-lg drop-shadow-sm mt-1">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="border-b border-b-slate-200">
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox rounded-[4px]" />
                                            </label>
                                        </th>
                                        <th className="text-slate-600 text-sm font-normal">ลำดับ</th>
                                        <th className="text-slate-600 text-sm font-normal">รายการสินค้า</th>
                                        <th className="text-slate-600 text-sm font-normal">ประเภท</th>
                                        <th className="text-slate-600 text-sm font-normal">สต็อก</th>
                                        <th className="text-slate-600 text-sm font-normal">ราคา</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map over products to generate table rows */}
                                    {importedGiftList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((product, index) => (
                                        <tr key={product.productId}>
                                            <td>
                                                <label>
                                                    <input type="checkbox" className="checkbox rounded-[4px] [--chkbg:theme(colors.green.600)]
                                                     [--chkfg:white] checked:border-slate-400"
                                                        checked={isProductImported(product.productId)}
                                                        onChange={() => handleCheckboxChange(product.productId)} />
                                                </label>
                                            </td>
                                            <td className="text-xs">{index + currentPage * itemsPerPage + 1}.</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="">
                                                        <div className="w-12 h-12">
                                                            <img src={product.image} alt={product.name}
                                                                className="rounded-md border border-slate-200" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-blue-600 hover:underline cursor-pointer">{product.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-slate-500 text-xs">{product.category.name}</td>
                                            <td className="text-slate-500 text-xs">{product.amount}</td>
                                            <td className="text-slate-500 text-xs">{product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex text-xs justify-center gap-x-1 mt-4">
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
                    </div>}
                    <div className="flex gap-x-1 mt-2">
                        <button className="text-blue-600 hover:bg-blue-100 border-blue-600 border px-2 py-1 rounded-md"
                            onClick={handleSubmit}>
                            บันทึกการเปลี่ยนแปลง
                        </button>
                        <button className="text-slate-400 hover:bg-slate-100 border-slate-400 border px-2 py-1 rounded-md"
                            onClick={handleCancel}>
                            ยกเลิก
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => { setIsImportGiftList(false) }}>close</button>
                </form>
            </dialog>}
        </>
    )
}
export default ModalGiftListImport