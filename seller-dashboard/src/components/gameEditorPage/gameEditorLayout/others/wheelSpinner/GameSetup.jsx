import React, { useState, useEffect } from "react";
import ConditionsWheel from "./Conditions";
import GiftListWheel from "./GiftListWheel";
import Setting from "./Setting";
import Decoration from "./Decoration";
import { useDataFetch } from "../../../../../hooks/useDataFetch"; 
import { useWheelContext } from "../../../../../contexts/WheelContext"; 

const GameSetup = ({
  gameId,
  toolList,
  currentTool,
  setCurrentTool,
  giftType,
  setGiftType,
  giftList,
  setGiftList,
  limitTicket,
  setLimitTicket,
  wheelProps,
  onUpdateProps,
  setImportingGiftList
}) => {

  const {gameConditionData, setGameConditionData, updateWheelState, setUpdateWheelState} = useWheelContext();
  const { loading, fetchDataWithParams } = useDataFetch();

  // Initialize state variable for checkboxes
  const [checkboxes, setCheckboxes] = useState([
    { 
      label: "เมื่อยอดรวมสินค้าครบตามกำหนด", 
      checked: true,
      minimum_order_amount:0
    },
    { label: "สั่งซื้อสินค้าที่ร่วมรายการ", checked: true },
    { label: "ชวนเพื่อนใหม่ติดตามร้าน", checked: true },
    {
      label: "ลูกค้าใหม่ซื้อสินค้าครั้งแรก",
      checked: true,
      require_minimum: true,
      minimum_price:0
    },
  ]);

  const [conditionProducts, setConditionProducts] = useState([null])

  // Toggle function for checkbox
  const handleToggleCheckbox = (index) => {
    const updateCheckboxes = [...checkboxes];
    updateCheckboxes[index].checked = !updateCheckboxes[index].checked;
    setCheckboxes(updateCheckboxes);
    setUpdateWheelState({...updateWheelState, game_condition_checkboxes: updateCheckboxes});
  };

  useEffect(() => {
    if(gameConditionData){
      const checkboxesState = mapCheckboxlabel(checkboxes, gameConditionData.condition.checkboxes_state);
      setCheckboxes(checkboxesState);
      setLimitTicket({checked: gameConditionData.condition.limitTicket.checked, value: gameConditionData.condition.limitTicket.amount});
      setConditionProducts(gameConditionData.conditionProducts);
    }
  }, [gameConditionData])

  function mapCheckboxlabel(checkboxes, newcheckedData) {
    console.log(newcheckedData);
    return checkboxes.map((checkbox, index) => {
      if (index == 0) {
        return {
          label: checkbox.label,
          checked: newcheckedData[index].checked,
          minimum_order_amount: newcheckedData[index].minimum_order_amount
        };
      }
      if (index == 3) {
        return {
          label: checkbox.label,
          checked: newcheckedData[index].checked,
          require_minimum: newcheckedData[index].require_minimum,
          minimum_price: newcheckedData[index].minimum_price
        };
      }
      else{
        return {
          label: checkbox.label,
          checked: newcheckedData[index].checked
        };
      }
    });
  }

  return (
    <div className={`mx-1 mt-1 ${!loading ? "block" : "none" }`}>
      {toolList[currentTool].title === "ลิสต์ของรางวัล" && (
        <>
          <GiftListWheel
            giftType={giftType}
            setGiftType={setGiftType}
            giftList={giftList}
            setGiftList={setGiftList}
            setImportingGiftList={setImportingGiftList}
          />
        </>
      )}

      {toolList[currentTool].title === "ตั้งค่าเกม" && (
        <>
          <Setting
            setCurrentTool={setCurrentTool}
            giftList={giftList}
            setGiftList={setGiftList}
          />
        </>
      )}

      {toolList[currentTool].title === "เงื่อนไขรับสิทธิ" && (
        <>
          <ConditionsWheel
            checkboxes={checkboxes}
            handleToggleCheckbox={handleToggleCheckbox}
            setCheckboxes={setCheckboxes}
            limitTicket={limitTicket}
            setLimitTicket={setLimitTicket}
            conditionProducts={conditionProducts}
          />
        </>
      )}
      {toolList[currentTool].title === "ตกแต่งเกม" && (
        <>
          <Decoration
            wheelProps={wheelProps}
            onUpdateProps={onUpdateProps}
          />
        </>
      )}
    </div>
  );
};
export default GameSetup;
