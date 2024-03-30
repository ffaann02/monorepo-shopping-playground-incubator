import { useNavigate } from "react-router-dom";
import { useDataFetch } from "../../../hooks/useDataFetch";
import WheelSpinner from "../gameList/WheelSpinner";
import React, { useState, useEffect } from 'react';

const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2); // Getting last two digits of the year
    return `${day}-${month}-${year}`;
};

const WheelSpinModal = ({ gameType, initName }) => {

    const { insertDataWithParams } = useDataFetch();
    const navigate = useNavigate();

    const [gameName, setGameName] = useState("");
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        setCurrentDate(getCurrentDate());
    }, [])

    const handleInputChange = (event) => {
        setGameName(event.target.value);
    };

    const handleSaveButton = () => {
        let savedName;
        if (gameName === "") {
            savedName = `${initName} ${currentDate}`
        }
        else{
            savedName = gameName;
        }
        const gameProfileData = {
            gameName: savedName,
            gameType: gameType,
            dateCreated: currentDate,
            status: "private"
        }
        insertDataWithParams("/mysql/create-game-profile", gameProfileData)
            .then(res => {
                console.log(res);
                if(res.newGameId){
                    navigate(`/activities/select-game/game-editor/${res.newGameId}`);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <button className="btn mt-2 bg-green-400 text-white" onClick={() => document.getElementById('WheelSpinModal').showModal()}>สร้างเกม</button>

            <dialog id="WheelSpinModal" className="modal">
                <div className="modal-box sm:max-w-5xl sm:max-h-2xl mx-auto">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex col-span-1 justify-center items-center">
                            <img className="h-80 w-70"
                                src="https://i.ibb.co/VNcXrf6/wheel-spinner-2.png" />
                        </div>
                        <div className="flex flex-col col-span-1 justify-center items-start">
                            <p className="py-4 text-start text-4xl font-bold">สร้างเกมสุ่มวงล้อใหม่</p>
                            <p className="font-semibold text-xl">ชื่อวงล้อ</p>
                            <input type="text"
                                className=" border-b pr-32 px-2 text-xl"
                                placeholder="ใส่ชื่อของวงล้อ"
                                onChange={handleInputChange} />
                            <p className="font-semibold mt-8 text-xl">วันที่สร้าง</p>
                            <input type="text"
                                className=" border-b pr-32 px-2 text-xl"
                                readOnly
                                value={currentDate || null} />
                            <div className="flex justify-end gap-2 mt-12 w-full pr-8">
                                <button className="btn bg-green-400 text-white text-lg"
                                    onClick={handleSaveButton}>สร้างเกม</button>
                                <form method="dialog">
                                    <button className="btn bg-[#555555] text-white text-lg">ปิด</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </dialog>

        </div>
    )
}

export default WheelSpinModal;