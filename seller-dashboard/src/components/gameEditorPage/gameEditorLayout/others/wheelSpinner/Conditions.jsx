import { useState } from "react";
import { FaBahtSign } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useWheelContext } from "../../../../../contexts/WheelContext";

const Conditions = ({ checkboxes, handleToggleCheckbox, setCheckboxes, limitTicket, setLimitTicket, conditionProducts }) => {

    const { updateWheelState, setUpdateWheelState } = useWheelContext();

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(conditionProducts.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleLimitTicketChange = (event) => {
        const value = parseInt(event.target.value); // Convert input value to an integer
        const updateLimitTicket = { ...limitTicket }; // Make a copy of the current state
        if (!isNaN(value)) {
            updateLimitTicket.value = value; // Update the value if it's a valid integer
        } else {
            updateLimitTicket.value = 0; // Set to 0 if input value is NaN
        }
        setLimitTicket(updateLimitTicket); // Update the state
        setUpdateWheelState({ ...updateWheelState, game_condition_limitTicket: updateLimitTicket });
    };

    return (
        <div className="flex flex-col gap-y-3 pb-4">
            <div className="bg-neutral-50 px-3 py-2 drop-shadow-sm border rounded-md">
                <p className="font-semibold text-gray-500 mt-1">ระบุเงื่อนไขในการรับสิทธิหมุนวงล้อ</p>
                <p className='text-xs text-blue-600'>*ลูกค้าจะได้รับสิทธิในการเล่นเพิ่มครั้งละ 1 สิทธิ ตามเงื่อนไข</p>

                <div className="mt-3 flex flex-col gap-y-3">
                    {checkboxes.map((checkbox, checkbox_index) => (
                        <div key={checkbox_index}>
                            <div className='flex justify-between items-center my-0.5'>
                                <p className='mr-1.5 text-sm'>{checkbox.label}</p>
                                <input type="checkbox" className="toggle toggle-sm toggle-success" checked={checkbox.checked} onChange={() => handleToggleCheckbox(checkbox_index)} />
                            </div>
                            {checkbox.checked && (
                                <div className="relative mt-1">
                                    {checkbox_index === 0 && <FirstCheckbox
                                        checkbox={checkbox}
                                        checkboxes={checkboxes}
                                        setCheckboxes={setCheckboxes}
                                        checkbox_index={checkbox_index}
                                    />}
                                    {checkbox_index === 1 && <SecondCheckbox
                                        currentPage={currentPage}
                                        handlePrevPage={handlePrevPage}
                                        handleNextPage={handleNextPage}
                                        totalPages={totalPages}
                                        conditionProducts={conditionProducts} />}
                                    {checkbox_index === 2 && <ThirdCheckbox />}
                                    {checkbox_index === 3 && <FourthCheckbox
                                        checkbox={checkbox}
                                        checkboxes={checkboxes}
                                        setCheckboxes={setCheckboxes}
                                        checkbox_index={checkbox_index} />}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-neutral-50 px-3 py-2 drop-shadow-sm border rounded-md">
                <div className="">
                    <p className="font-semibold text-gray-500">จำนวนสิทธิสะสม</p>
                    <p className="text-xs text-blue-600">*จำกัดจำนวนสิทธิสะสมของลูกค้า</p>
                </div>
                <div className="flex gap-x-4 mt-2">
                    <div className="flex w-fit">
                        <input type="radio"
                            onChange={() => {
                                setLimitTicket(prev => {
                                    // Update the checked state
                                    const updateLimitTicket = { ...prev, checked: !prev.checked };

                                    // Set another state here
                                    setUpdateWheelState({ ...updateWheelState, game_condition_limitTicket: updateLimitTicket });
                                    // Example: setAnotherState(newValue);

                                    return updateLimitTicket;
                                });

                            }}
                            className="radio radio-sm radio-success"
                            checked={!limitTicket.checked} />
                        <label className="ml-2 mt-1 text-xs text-slate-500">ไม่จำกัด</label>
                    </div>
                    <div className="flex w-fit">
                        <input type="radio"
                            onChange={() => {
                                setLimitTicket(prev => {
                                    // Update the checked state
                                    const game_condition_limitTicket = { ...prev, checked: !prev.checked };

                                    // Set another state here
                                    setUpdateWheelState({ ...updateWheelState, limitTicket: game_condition_limitTicket });
                                    // Example: setAnotherState(newValue);

                                    return game_condition_limitTicket;
                                });
                            }}
                            className="radio radio-sm radio-success"
                            checked={limitTicket.checked} />
                        <label className="ml-2 mt-1 text-xs text-slate-500">สะสมไม่เกิน (ครั้ง)</label>
                    </div>
                </div>
                {limitTicket && limitTicket.checked &&
                    <div className="mt-2">
                        <input
                            type="text"
                            value={limitTicket.value}
                            onChange={handleLimitTicketChange}
                            placeholder={limitTicket.value}
                            className="text-slate-500 w-1/2 py-4 input-sm pl-2 border border-slate-300 rounded-md focus:border-slate-400 focus:outline-none focus:drop-shadow-md -z-0"
                        />
                        <p className="mt-1 text-[0.65rem] ml-1 text-blue-600">{limitTicket && limitTicket.checked && (limitTicket.value < 1 ? "*ขั้นต่ำ 1 ครั้ง" : "")}</p>
                    </div>}
            </div>
        </div>
    )
}
export default Conditions;

const FirstCheckbox = ({ checkbox, checkboxes, setCheckboxes, checkbox_index }) => {

    const { updateWheelState, setUpdateWheelState } = useWheelContext();

    const handleMinimumOrderAmountChange = (event) => {
        const { value } = event.target;
        let numericValue = parseFloat(value); // Parse input value to a number
        if (isNaN(numericValue)) { // Check if the parsed value is NaN
            numericValue = 0; // Set value to 0 if it's NaN
        }
        setCheckboxes(prevCheckboxes => {
            const updatedCheckboxes = [...prevCheckboxes];
            updatedCheckboxes[checkbox_index].minimum_order_amount = numericValue;
            setUpdateWheelState({...updateWheelState, game_condition_checkboxes:updatedCheckboxes})
            return updatedCheckboxes;
        });
    };

    return (

        <div>
            {
                checkbox.checked && (
                    <div className="mb-1 relative">
                        <div className="bg-gray-200 border border-slate-300 rounded-l-md flex items-center justify-center h-full w-10 absolute z-10">
                            <FaBahtSign className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder={checkbox.checked && checkbox.minimum_order_amount}
                            value={checkbox.checked && checkbox.minimum_order_amount}
                            onChange={handleMinimumOrderAmountChange}
                            className="pl-12 w-1/2 rounded-r-md input-sm border border-slate-300 rounded-md focus:border-slate-400 focus:outline-none focus:drop-shadow-md -z-0"
                        />
                    </div>
                )
            }
        </div>
    );
};


const SecondCheckbox = ({ currentPage, handlePrevPage, handleNextPage, totalPages, conditionProducts }) => {
    const itemsPerPage = 3;

    return (
        <>
            {conditionProducts &&
                <p className="text-xs text-slate-500 ml-0.5">{conditionProducts.length} สินค้า</p>
            }
            <div className="overflow-x-auto bg-white drop-shadow-sm border rounded-[0.25rem]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="">
                            <th className="font-semibold">ลำดับ</th>
                            <th className="font-semibold">ชื่อสินค้า</th>
                            <th className="font-semibold">ราคา</th>
                            {/* <th className="font-semibold">คงเหลือ</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {conditionProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((product, product_index) => (
                            <tr key={product_index} className="bg-none hover:bg-green-50">
                                <th className="text-xs font-normal">{currentPage * itemsPerPage + product_index + 1}.</th>
                                <td className="text-xs whitespace-normal break-words text-blue-600 hover:underline cursor-pointer">{product.name}</td>
                                <td className="text-xs">฿{product.price}</td>
                                {/* <td className="text-xs">{product.amount}</td> */}
                                <td>
                                    <div className="flex justify-between">
                                        <FaRegTrashAlt className="text-red-400 hover:text-red-600 cursor-pointer my-auto" />
                                        <BiDotsVerticalRounded className="text-slate-500 hover:text-slate-600 text-lg cursor-pointer my-auto" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-1">
                <div>
                    <button className="text-xs text-green-600 hover:underline ml-1">นำเข้ารายการสินค้า +</button>
                </div>
                {conditionProducts && conditionProducts.length > itemsPerPage && (
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
                )}
            </div>
        </>
    );
}

const ThirdCheckbox = () => {
    return (
        <div>
            <p className="text-xs text-slate-500">ด้วยการกรอกรหัสแนะนำร้านผ่านแชทหลังจาก Add Friend ร้านค้า</p>
        </div>
    );
}

const FourthCheckbox = ({ checkbox, checkboxes, setCheckboxes, checkbox_index }) => {

    const { updateWheelState, setUpdateWheelState } = useWheelContext();

    const handleMinimumPriceChange = (event) => {
        const value = parseFloat(event.target.value); // Convert input value to a number
        const updatedCheckboxes = [...checkboxes];
        if (!isNaN(value)) {
            updatedCheckboxes[checkbox_index].minimum_price = value;
        } else {
            updatedCheckboxes[checkbox_index].minimum_price = 0; // Set to 0 if input value is NaN
        }
        setCheckboxes(updatedCheckboxes);
    };


    return (
        <div className="flex flex-col mt-2">
            <div className="flex gap-x-6">
                <div className="flex w-fit">
                    <input type="radio"
                        onChange={() => {
                            const updatedCheckboxes = [...checkboxes];
                            updatedCheckboxes[checkbox_index].require_minimum = !updatedCheckboxes[checkbox_index].require_minimum
                            setCheckboxes(updatedCheckboxes);
                            setUpdateWheelState({...updateWheelState, game_condition_checkboxes:updatedCheckboxes})
                        }}
                        className="radio radio-sm radio-success"
                        checked={!checkbox.require_minimum} />
                    <label className="ml-2 mt-1 text-xs text-slate-500">ไม่จำกัดการซื้อขั้นต่ำ</label>
                </div>
                <div className="flex w-fit">
                    <input type="radio"
                        onChange={() => {
                            const updatedCheckboxes = [...checkboxes];
                            updatedCheckboxes[checkbox_index].require_minimum = !updatedCheckboxes[checkbox_index].require_minimum
                            setCheckboxes(updatedCheckboxes);
                            setUpdateWheelState({...updateWheelState, game_condition_checkboxes:updatedCheckboxes})
                        }}
                        className="radio radio-sm radio-success"
                        checked={checkbox.require_minimum} />
                    <label className="ml-2 mt-1 text-xs text-slate-500">ยอดซื้อขั้นต่ำ (บาท)</label>
                </div>
            </div>
            {checkbox.require_minimum &&
                <div className="mt-2 relative">
                    <div className="bg-gray-200 border border-slate-300 rounded-l-md flex items-center justify-center h-full w-10 absolute z-10">
                        <FaBahtSign className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        value={checkbox.require_minimum && checkbox.minimum_price}
                        onChange={handleMinimumPriceChange}
                        className="pl-12 w-1/2 text-slate-500 rounded-r-md input-sm border border-slate-300 rounded-md focus:border-slate-400 focus:outline-none focus:drop-shadow-md -z-0"
                    />
                </div>}
        </div>
    );
}

