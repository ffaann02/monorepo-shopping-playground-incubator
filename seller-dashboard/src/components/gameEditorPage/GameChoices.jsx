import { Link } from "react-router-dom"
import React, { useState } from "react"

import WheelSpinModal from "./GameChoiceModal/WheelSpinModal"
import MemoryCardModal from "./GameChoiceModal/MemoryCardModal"
import CraneMachineModal from "./GameChoiceModal/CraneMachinModal"

const GameList = [
    {
        id: 1,
        title_th: "สุ่มวงล้อ",
        title_eng: "Wheel Spinner",
        key_name: "wheel-spinner",
        icon_img: "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fshopping_clone%2FWheelSpinnerFixed.png?alt=media&token=7d9766e7-d12b-4d0e-bfb9-9e0d2b82721e",
        url: "/wheel-spinner",
        type: ["ของแถม", "หลังการขาย"],
        modals: "wheel",
        short_title: "ws"
    },
    {
        id: 2,
        title_th: "การ์ดความจำ",
        title_eng: "Memory Card",
        key_name: "memory-card",
        icon_img: "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fshopping_clone%2FMemoryCardFixed.png?alt=media&token=44944608-4071-493b-aade-c4b4dbbf6abd",
        url: "/memory-card",
        modals: "card",
        short_title: "mm"
    },
    {
        id: 3,
        title_th: "ตู้คีบ",
        title_eng: "Crane Machine",
        key_name: "crane-machine",
        icon_img: "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fshopping_clone%2FClaeMachineFixed.png?alt=media&token=94077fdb-b95c-4c04-a162-f380688849cc",
        url: "/crane-machine",
        modals: "crane",
        short_title: "cm"
    }
]

const renderModalComponent = (modalType, short_title, title_eng) => {
    switch (modalType) {
        case 'wheel':
            return <WheelSpinModal gameType={short_title} initName={title_eng}/>;
        case 'card':
            return <MemoryCardModal gameType={short_title} initName={title_eng}/>;
        case 'crane':
            return <CraneMachineModal gameType={short_title} initName={title_eng}/>;
        default:
            return null;
    }
}

const GameChoices = () => {

    return (
        <div className="w-full grid grid-cols-3 gap-3">
            {GameList.map((game, index) => (
                //<Link to={"/activities/game-editor" + game.url}>
                <div className="bg-white hover:drop-shadow-md transition-all duration-100 ease-linear rounded-lg text-center pt-2 pb-4 drop-shadow-sm border-b-[1px] cursor-pointer"
                >
                    <img src={game.icon_img} className="p-10" />
                    <p className="text-2xl font-semibold">{game.title_th}</p>
                    <p className="text-lg font-semibold">({game.title_eng})</p>
                    {renderModalComponent(game.modals, game.short_title, game.title_eng)}
                </div>
                //</Link>
            ))}
        </div>
    )
}
export default GameChoices