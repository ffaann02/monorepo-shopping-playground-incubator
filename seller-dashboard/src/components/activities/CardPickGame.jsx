import React from 'react'
import { LuStore } from "react-icons/lu";
import { MdOutlineLiveTv } from "react-icons/md";
import { PiConfettiBold } from "react-icons/pi";

const CardPickGame = ({ gamePick, textHeader, gameAcceptIndex, displayImportGameModal }) => {

    const iconHeader = () => {
        if(gameAcceptIndex === 0)
            return(
                <LuStore className="text-green-600 ml-2 text-lg" />
            )
        else if (gameAcceptIndex === 1)
            return(
                <MdOutlineLiveTv className="text-blue-600 ml-2 text-lg" />
            )
        else if (gameAcceptIndex === 2)
            return(
                <PiConfettiBold className="text-red-400 ml-2 text-lg" />
            )
    }

    return (
        <div className="col-span-4">
            {gamePick
                ?
                <div className="col-span-4">
                    <p className="flex">{textHeader[gameAcceptIndex]}{iconHeader()}</p>
                    <div className="pt-2 bg-white rounded-xl cursor-pointer drop-shadow-sm hover:drop-shadow-md"
                        onClick={() => displayImportGameModal(gameAcceptIndex)}>
                        <img src={gamePick.imageSrc} className="object-cover mx-auto p-2 h-[300px]" />
                        <div className="border-t-2 border-t-slate-200 w-full rounded-b-lg p-2 mt-1.5 flex flex-col">
                            <p className="font-semibold text-green-600">{gamePick.title}</p>
                            <p className="text-slate-500 text-xs mt-1">แก้ไขล่าสุด {gamePick.lastEdited}</p>
                            <div className="text-sm mt-0.5">
                                <div className="bg-green-300 w-fit px-2 py-1 rounded-full">
                                    <p className="text-green-700 text-xs">กำลังใช้งาน</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="col-span-4 pb-6">
                    <p className="flex">{textHeader[gameAcceptIndex]}{iconHeader()}</p>
                    <div className="pt-2 bg-white border border-slate-200 rounded-xl hover:drop-shadow-md
          drop-shadow-sm h-full flex text-slate-400 hover:underline cursor-pointer transition-all duration-100 ease-linear"
                        onClick={() => displayImportGameModal(gameAcceptIndex)}>
                        <p className="mx-auto my-[55%] text-xl">เพิ่มเกม</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default CardPickGame