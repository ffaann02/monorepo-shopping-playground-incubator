// #4068cb
// #e3eaf4
// #fbaba4
// #facdcc
// #ffea91
import React, { useState, useEffect, useRef } from "react"
import { Wheel } from "react-custom-roulette";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import Workspace from "../gameEditorLayout/shared/Workspace";
import SelectTools from "../gameEditorLayout/shared/SelectTools";
import SettingTools from "../gameEditorLayout/shared/SettingTools";
import { FaMobileAlt } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { WheelProvider, useWheelContext } from "../../../contexts/WheelContext";
import { useDataFetch } from "../../../hooks/useDataFetch";
import WorkSpace from "../gameEditorLayout/others/memoryCard/WorkSpace";
import MemoryGameSetup from "../gameEditorLayout/others/memoryCard/GameSetup";
import ModalGiftListImport from "../gameEditorLayout/shared/ModalGiftListImport";
import { useMemoryContext } from "../../../contexts/MemoryContext";

const toolList = [
    {
        title: "ลิสต์ของรางวัล",
    },
    {
        title: "ตั้งค่าเกม",
    },
    {
        title: "เงื่อนไขรับสิทธิ",
    },
    {
        title: "ตกแต่งเกม",
    },
]

const MemoryCard = ({ gameId }) => {

    const [currentTool, setCurrentTool] = useState(0);
    const { giftList, setGiftList, updateMemoryState, setGameSetting, setCards, setDecoration, setConditionsAttempt, setConditions } = useMemoryContext();
    const { fetchDataWithParams, insertDataWithParams } = useDataFetch();

    // Update game setting to firebase
    const updateGameSetting = (memoryState) => {
        memoryState.gameId = gameId;
        memoryState.giftList = giftList;
        insertDataWithParams("/firebase/update-game-setting", memoryState)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.error("Error update game name:", error);
            });
        console.log(memoryState);
    }

    // Fetch game setting
    useEffect(() => {
        fetchDataWithParams('/firebase/get-game-setting', { gameId })
            .then(res => {
                console.log(res);
                const formatGameSetting = {
                    difficultyLevel: res.difficultyLevel.value,
                    conditions: {
                        time: res.conditions.time,
                        attempt: res.conditions.attempt
                    }
                }
                setGameSetting(formatGameSetting)
                if(res.cards.length >= 8 ){
                    setCards(res.cards);
                }
                if(res.conditionTime.length > 0){
                    setConditions(res.conditionTime);
                }
                if(res.conditionAttempt.length > 0){
                    console.log("PANN");
                    setConditionsAttempt(res.conditionAttempt);
                }
            })
            .catch(error => {
                console.error("Error get game setting:", error);
            });
        fetchDataWithParams('/firebase/game_decoration', { gameId })
            .then(res => {
                setDecoration(res);
            })
            .catch(error => {
                console.error("Error get game setting:", error);
            });
    }, [])

    return (
        <div className="px-16">
            <ModalGiftListImport giftList={giftList} setGiftList={setGiftList} />
            <div className="flex justify-between">
                <div>
                    <p className="text-2xl font-semibold">เกมการ์ดความจำ</p>
                    <p className="text-md font-thin font-sans flex">
                        ตั้งค่าและจัดการเกมบนหน้าร้านคุณใน
                        <p className="ml-1 font-normal">LINE SHOPPING</p>
                    </p>
                </div>
                <div className="my-auto">
                    <button className="p-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md"
                        onClick={() => updateGameSetting(updateMemoryState)}>
                        บันทึกการเปลี่ยนแปลง
                    </button>
                </div>
            </div>
            <div className="w-full mt-4 grid grid-cols-12 gap-x-4 gap-y-3">
                <SelectTools
                    toolList={toolList}
                    currentTool={currentTool}
                    setCurrentTool={setCurrentTool}
                />
                <WorkSpace />
                <MemoryGameSetup
                    toolList={toolList}
                    currentTool={currentTool}
                    setCurrentTool={setCurrentTool}
                    gameId={gameId}
                />
            </div>
        </div>
    );
};
export default MemoryCard;
