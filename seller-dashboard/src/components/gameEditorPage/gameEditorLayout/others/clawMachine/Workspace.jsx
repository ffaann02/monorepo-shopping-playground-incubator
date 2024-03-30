import { useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { useClawContext } from "../../../../../contexts/ClawContext";
import Game from "./Game";

const Workspace = () => {
    const [editMode, setEditMode] = useState(false);
    const {gameName,setGameName} = useClawContext();
    // Function to toggle the edit mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // Function to handle changes in the game name input field
    const handleChangeGameName = (e) => {
        setGameName(e.target.value);
    };

    // Function to handle saving changes
    const handleSave = () => {
        // Perform save action here
        // You can add your save logic here
        // For example: saveGameName(gameName);
        toggleEditMode(); // Exit edit mode after saving
    };
    return (
        <div className="col-span-6 border bg-white rounded-lg">
            <div className="w-full px-2 py-1.5 flex gap-x-1 border-b justify-between">
                <div className="flex-1 relative">
                    <>
                        <input
                            type="text"
                            value={gameName}
                            onChange={handleChangeGameName}
                            className="text-slate-500 placeholder:text-slate-300 w-full border h-full pl-2 pr-20 py-1 rounded-sm
                            focus:border focus:border-slate-400 focus:drop-shadow-md focus:outline-none"
                            placeholder="Please Input"
                            disabled={!editMode} // Disable input field when not in edit mode
                        />
                        <button
                            onClick={editMode ? handleSave : toggleEditMode} // Call handleSave when in edit mode, otherwise toggleEditMode
                            className="absolute inset-y-0 right-0 py-1 mr-2.5 rounded-r-sm text-slate-400 text-sm hover:underline"
                        >
                            {editMode ? "บันทึก" : "แก้ไข"} {/* Change button text based on edit mode */}
                        </button>
                    </>
                </div>
                <div className="flex gap-x-1">
                    <button className="bg-slate-100 hover:bg-green-100 px-1 py-1 flex rounded-[0.25rem] border border-green-600">
                        <FaMobileAlt className="text-lg my-auto text-green-600" />
                        <p className="text-sm my-auto text-green-600">พรีวิว</p>
                    </button>
                    <button className="bg-blue-50 hover:bg-blue-100 px-1 py-1 flex rounded-[0.25rem] border border-blue-600">
                        <IoMdShareAlt className="text-lg my-auto text-blue-600" />
                        <p className="text-sm my-auto text-blue-600">เปิดใช้งาน</p>
                    </button>
                </div>
            </div>
            <div>
                <Game/>
            </div>
        </div>
    )
}
export default Workspace