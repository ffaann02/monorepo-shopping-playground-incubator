import { useState, useEffect } from "react"; // Import useState hook
import { useMemoryContext } from "../../../../../contexts/MemoryContext";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { useEditorShareContext } from "../../../../../contexts/EditorShareContext";
import { useDataFetch } from "../../../../../hooks/useDataFetch";

const ConditionMemory = () => {
  const {
    gameSetting,
    setGameSetting,
    conditions,
    setConditions,
    conditionsAttempt,
    setConditionsAttempt,
    devMode,
    setDevMode,
    flipAllCards,
    giftList,
    setGiftList,
    updateMemoryState,
    setUpdateMemoryState
  } = useMemoryContext();

  const { isImportGiftList, setIsImportGiftList } = useEditorShareContext();

  const { fetchData } = useDataFetch();

  const [minute, setMinute] = useState("00"); // State for minute input, initialized to '00'
  const [second, setSecond] = useState("00"); // State for second input, initialized to '00'
  const [editingIndex, setEditingIndex] = useState(null); // State to store the index of the condition being edited
  const [isEditing, setIsEditing] = useState(false);
  const [attempt, setAttempt] = useState("5"); // State for attempt input, initialized to '00'
  useEffect(() => {
    flipAllCards(true);
  }, [])

  const toggleTimeCondition = () => {
    if (gameSetting.conditions.time && !gameSetting.conditions.attempt) {
      return;
    }
    setUpdateMemoryState({
      ...updateMemoryState, conditions: {
        time: !gameSetting.conditions.time,
        attempt: gameSetting.conditions.attempt,
      }
    })
    setGameSetting((prevSettings) => ({
      ...prevSettings,
      conditions: {
        ...prevSettings.conditions,
        time: !prevSettings.conditions.time, // Toggle the 'time' condition
      },
    }));
  };

  const toggleAttemptCondition = () => {
    if (gameSetting.conditions.attempt && !gameSetting.conditions.time) {
      return;
    }
    setUpdateMemoryState({
      ...updateMemoryState, conditions: {
        time: gameSetting.conditions.time,
        attempt: !gameSetting.conditions.attempt,
      }
    })
    setGameSetting((prevSettings) => ({
      ...prevSettings,
      conditions: {
        ...prevSettings.conditions,
        attempt: !prevSettings.conditions.attempt, // Toggle the 'attempt' condition
      },
    }));
  };

  const [selectedGift, setSelectedGift] = useState(null);

  const handleAddItemClick = () => {
    document.getElementById('modal_select_gift_conditions').showModal()
    setIsImportGiftList(true);
  };

  const handleMinuteInputChange = (e) => {
    let value = e.target.value;
    setMinute(value); // Update minute state
  };

  const handleSecondInputChange = (e) => {
    let value = e.target.value;
    setSecond(value); // Update second state
  };

  const handleAttemptInputChange = (e) => {
    let value = e.target.value;
    setAttempt(value); // Update second state
  };

  const handleSaveCondition = () => {
    if (editingIndex !== null) {
      // If editing an existing condition, update it in the conditions state
      const updatedConditions = [...conditions];
      updatedConditions[editingIndex] = { minute, second, selectedGift };
      setConditions(updatedConditions);
      setEditingIndex(null); // Clear editing index
    } else {
      // If adding a new condition, add it to the conditions state
      const dupConditions = [...conditions];
      dupConditions.push({ minute, second, selectedGift });
      setUpdateMemoryState({...updateMemoryState, conditionTime: dupConditions});
      setConditions((prevConditions) => [
        ...prevConditions,
        { minute, second, selectedGift },
      ]);
      console.log(conditions);
      // );
    }
    // Reset minute and second inputs
    setMinute("00");
    setSecond("00");
    setSelectedGift(null);
  };

  const handleSaveConditionAttempt = () => {
    console.log("hello");
    if (editingIndex !== null) {
      // If editing an existing condition, update it in the conditions state
      const updatedAttempt = [...conditionsAttempt];
      updatedAttempt[editingIndex] = { attempt, selectedGift };
      setConditionsAttempt(updatedAttempt);
      setEditingIndex(null); // Clear editing index
    } else {
      // If adding a new condition, add it to the conditions state
      const dupConditions = [...conditionsAttempt];
      dupConditions.push({ attempt, selectedGift });
      setUpdateMemoryState({...updateMemoryState, conditionAttempt: dupConditions});
      setConditionsAttempt((prevConditions) => [
        ...prevConditions,
        { attempt, selectedGift },
      ]);
    }
    // Reset minute and second inputs
    setAttempt("0");
    setSelectedGift(null);
  };

  const handleDeleteCondition = (index) => {
    // Remove the condition at the specified index from the conditions state
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
    setUpdateMemoryState({...updateMemoryState, conditionTime: updatedConditions});
  };

  const handleDeleteConditionAttempt = (index) => {
    // Remove the condition at the specified index from the conditions state
    const updatedConditions = [...conditionsAttempt];
    updatedConditions.splice(index, 1);
    setConditionsAttempt(updatedConditions);
    setUpdateMemoryState({...updateMemoryState, conditionAttempt: updatedConditions});
    // Remove the condition at the specified index from the conditions state
  };
  const [importedGiftList, setImportedGiftList] = useState(null);

  const handleChooseGift = (product) => {
    setSelectedGift(product);
    setIsImportGiftList(false);
    document.getElementById('modal_select_gift_conditions').close();
  }


  useEffect(() => {
    if (isImportGiftList) {
      fetchData("/product/get-giveaways-list")
        .then(response => {
          console.log(response);
          setImportedGiftList(response);
        })
        .catch(error => {
          console.error("Error fetching selected giveaways:", error);
        })
    }
  }, [isImportGiftList])

  return (
    <div className="pl-1 pr-0.5 mt-1">
      <dialog id="modal_select_gift_conditions" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {/* Modal content */}
          <h3 className="text-lg font-semibold">เลือกรายการของรางวัล</h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* Table header */}
              <thead>
                <tr>
                  <th></th>
                  <th className="text-sm font-semibold">รายการ</th>
                  <th className="text-sm font-semibold">คงเหลือ</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {/* Render product items */}
                {importedGiftList && importedGiftList.map((product, index) => (
                  <tr key={index} className="hover:bg-green-100 cursor-pointer"
                    onClick={() => handleChooseGift(product)}>
                    <td className="text-sm font-normal text-slate-500">{index + 1}</td>
                    {/* Product image */}
                    <td>
                      <div className="flex">
                        <img src={product.image} alt={product.name} className="h-12 w-12 object-contain mr-2 rounded-md border" />
                        <p className="my-auto">{product.name}</p>
                      </div>
                    </td>
                    {/* Product name */}
                    {/* Product amount */}
                    <td className="text-sm font-normal text-slate-500">{product.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
      <p className="text-sm text-slate-500">การแจกรางวัล</p>
      <div className="flex gap-x-2 mt-2">
        <div
          className={`flex px-2 py-1.5 rounded-md cursor-pointer w-fit ${gameSetting.conditions.time ? "bg-slate-100" : "bg-white"
            }`}
          onClick={toggleTimeCondition}
        >
          <input
            type="radio"
            className="radio radio-sm radio-success"
            checked={gameSetting.conditions.time}
          // onChange={() => { }}
          // onClick={toggleTimeCondition}
          />
          <label className="text-slate-500 ml-2 text-xs mt-1 cursor-pointer">
            เวลา
          </label>
        </div>
        <div
          className={`flex px-2 py-1.5 rounded-md cursor-pointer w-fit ${gameSetting.conditions.attempt ? "bg-slate-100" : "bg-white"
            }`}
          onClick={toggleAttemptCondition}
        >
          <input
            type="radio"
            className="radio radio-sm radio-success"
            checked={gameSetting.conditions.attempt}
          // onChange={() => { }}
          // onClick={toggleAttemptCondition}
          />
          <label className="text-slate-500 ml-2 text-xs mt-1 cursor-pointer">
            จำนวนรอบในการเล่น
          </label>
        </div>
      </div>
      {gameSetting && gameSetting.conditions.time && (
        <div
          className="bg-slate-50 mt-3 rounded-md p-3 pt-2 drop-shadow-sm border"
          id="time_slot"
        >
          <p className="text-sm text-slate-500">จบเกมภายในช่วงเวลา</p>
          <div className="overflow-x-auto mt-1">
            <table className="table rounded-lg bg-white">
              <thead className="">
                <tr>
                  <th className="text-sm font-normal text-slate-500">
                    เงื่อนไข
                  </th>
                  <th className="text-sm font-normal text-slate-500">
                    ของรางวัล
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Render existing conditions */}
                {conditions.map((condition, index) => (
                  <tr key={index}>
                    <td className="text-slate-500">
                      ภายใน{" "}
                      {condition.minute != "00" && ` ${condition.minute} นาที`}{" "}
                      <br />{" "}
                      {condition.second != "00" && `${condition.second} วินาที`}
                    </td>
                    <td className="text-blue-600 cursor-pointer hover:underline">
                      {condition.selectedGift.name}
                    </td>
                    <td className="flex justify-end">
                      {/* <AiOutlineEdit className="mt-1 text-green-600 text-lg cursor-pointer" onClick={() => handleEditExistCondition(index)} /> */}
                      <FaRegTrashAlt
                        className="mt-1.5 text-red-400 text-md ml-1 cursor-pointer"
                        onClick={() => handleDeleteCondition(index)}
                      />
                    </td>
                  </tr>
                ))}
                {/* Render editing row */}
                <tr>
                  <td className="text-slate-500">
                    <div className="relative flex bg-slate-50 w-fit border rounded-[0.2rem] py-0.5">
                      <input
                        type="text"
                        className="w-7 p-1 border-r-0 focus:outline-none text-center bg-transparent"
                        id="minute_input"
                        value={minute}
                        onChange={handleMinuteInputChange}
                      />
                      <p className="my-auto">:</p>
                      <input
                        type="text"
                        className="w-7 p-1 border-l-0 focus:outline-none text-center bg-transparent"
                        id="second_input"
                        value={second}
                        onChange={handleSecondInputChange}
                      />
                    </div>
                  </td>
                  <td className="">
                    <div>
                      <p onClick={handleAddItemClick} className="text-slate-400 cursor-pointer hover:text-slate-500 underline my-auto">+ เลือกรายการของรางวัล</p>
                      {selectedGift !== null && <p onClick={handleAddItemClick} className="text-blue-400 text-xs">{selectedGift.name}</p>}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex justify-between">
                      <FaCheck
                        className="my-auto text-slate-400 hover:text-green-600 text-md cursor-pointer"
                        onClick={handleSaveCondition}
                      />
                      <FaRegTrashAlt className="my-auto text-red-400 text-md ml-1 cursor-pointer" />
                    </div>
                  </td>
                </tr>
                {/* <tr>
                <td colSpan={3} className="text-center text-green-600 cursor-pointer hover:underline hover:bg-green-50 hover:border hover:border-green-200">
                  เพิ่มเงื่อนไข
                </td>
              </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {gameSetting && gameSetting.conditions.attempt && (
        <div
          className="bg-slate-50 mt-3 rounded-md p-3 pt-2 drop-shadow-sm border"
          id="attempt_slot"
        >
          <p className="text-sm text-slate-500">จบเกมภายในจำนวนรอบการเล่น</p>
          <div className="overflow-x-auto mt-1">
            <table className="table rounded-lg bg-white">
              <thead className="">
                <tr>
                  <th className="text-sm font-normal text-slate-500">
                    เงื่อนไข
                  </th>
                  <th className="text-sm font-normal text-slate-500">
                    ของรางวัล
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Render existing conditions */}
                {conditionsAttempt.map((condition, index) => (
                  <tr key={index}>
                    <td className="text-slate-500">
                      ภายใน {condition.attempt} ครั้ง
                    </td>
                    <td className="text-blue-600 cursor-pointer hover:underline">
                      Quality Control Specialist
                    </td>
                    <td className="flex justify-end">
                      {/* <AiOutlineEdit className="mt-1 text-green-600 text-lg cursor-pointer" onClick={() => handleEditExistCondition(index)} /> */}
                      <FaRegTrashAlt
                        className="mt-1.5 text-red-400 text-md ml-1 cursor-pointer"
                        onClick={() => handleDeleteConditionAttempt(index)}
                      />
                    </td>
                  </tr>
                ))}
                {/* Render editing row */}
                <tr>
                  <td className="text-slate-500 flex">
                    <div className="relative flex bg-slate-50 w-fit border rounded-[0.2rem] py-0.5">
                      <input
                        type="text"
                        className="w-10 p-1 border-r-0 focus:outline-none text-center bg-transparent"
                        id="attempt_input"
                        value={attempt}
                        onChange={handleAttemptInputChange}
                      />
                    </div>
                    <p className="text-xs my-auto ml-1">ครั้ง</p>
                  </td>
                  <td
                    className="text-slate-400 cursor-pointer hover:text-slate-500 underline"
                    onClick={handleAddItemClick}
                  >
                    + เลือกรายการของรางวัล
                  </td>
                  <td className="">
                    <div className="flex justify-between">
                      <FaCheck
                        className="my-auto text-slate-400 hover:text-green-600 text-md cursor-pointer"
                        onClick={handleSaveConditionAttempt}
                      />
                      <FaRegTrashAlt className="my-auto text-red-400 text-md ml-1 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConditionMemory;
