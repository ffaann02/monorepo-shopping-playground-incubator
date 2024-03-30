import { useContext, useState, useEffect } from "react"
import GameChoices from "../../components/gameEditorPage/GameChoices"
import Suggestion from "../../components/gameEditorPage/Suggestion"
import { UserContext } from "../../contexts/UserContext"
import { LuStore } from "react-icons/lu";
import { MdDelete, MdDeleteOutline, MdOutlineLiveTv } from "react-icons/md";
import { PiConfettiBold } from "react-icons/pi";
import SelectTools from "../../components/gameEditorPage/gameEditorLayout/shared/SelectTools";
import { BsFilterLeft } from "react-icons/bs";
import { useDataFetch } from "../../hooks/useDataFetch";
import { useNavigate } from "react-router-dom";
import ModalGameCreatedList from "../../components/activities/ModalGameCreatedList";
import CardPickGame from "../../components/activities/CardPickGame";
import { RiDeleteBin6Line } from "react-icons/ri";

const toolList = [
  {
    title: "เลือกเกมที่ใช้งาน"
  },
  {
    title: "เกมที่สร้างไว้"
  },
  {
    title: "สร้างเกมใหม่"
  },
]

const fakeLists = [
  {
    title: "วงล้อของแถมร้าน 1",
    lastEdited: "01/03/2024",
    status: "กำลังใช้งาน",
    imageSrc: "/images/cover.png"
  },
  {
    title: "LIVE วันศุกร์ Memory Card",
    lastEdited: "01/03/2024",
    status: "ปิดการใช้งาน",
    imageSrc: "/images/cover1.png"
  },
  {
    title: "Untitled Wheel Spinner 1",
    lastEdited: "25/02/2024",
    status: "ไม่สาธารณะ",
    imageSrc: "/images/cover.png"
  },
  {
    title: "TEST วงล้อ 2",
    lastEdited: "20/02/2024",
    status: "ไม่สาธารณะ",
    imageSrc: "/images/cover.png"
  },
  {
    title: "TEST Memory Card 1",
    lastEdited: "15/02/2024",
    status: "ไม่สาธารณะ",
    imageSrc: "/images/cover.png"
  }
];

const SelectGame = () => {

  const navigate = useNavigate();

  const { fetchData, insertDataWithParams } = useDataFetch();
  const [currentTool, setCurrentTool] = useState(0);
  const [gameCreatedList, setGameCreatedList] = useState([]);
  const [isImportGame, setIsImportGame] = useState(false);
  const [activityType, setActivityType] = useState(0);

  const [regularGamePick, setRegularGamePick] = useState(null);
  const [liveGamePick, setLiveGamePick] = useState(null);

  const [gamepick, setGamePick] = useState();

  const fetchGetAllGameProfile = () => {
    fetchData("/mysql/get-all-game-profile")
      .then(res => {
        setGameCreatedList(res);
        findCurrentGamePick(res);
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchGetAllGameProfile();
  }, [])

  const findCurrentGamePick = (gamesList) => {
    const regularGame = gamesList.find(game => game.rawStatus === "active" && gameAccept[0].includes(game.gameType));
    const liveGame = gamesList.find(game => game.rawStatus === "active" && gameAccept[1].includes(game.gameType));
    setRegularGamePick(regularGame);
    setLiveGamePick(liveGame);
    setGamePick({
      regular: regularGame,
      live: liveGame
    })
  }

  const textHeader = [
    "เกมประจำหน้าร้าน",
    "เกมในไลฟ์",
    "เกมพิเศษเฉพาะช่วง"
  ]

  const gameAccept = [
    ["ws"], // เกมประจำหน้าร้าน
    ["mm"], // เกมใน Live
    ["ws", "mm"] // เกมพิเศษเฉพาะช่วง
  ]

  const displayImportGameModal = (typeNumber) => {
    setActivityType(typeNumber);
    document.getElementById('modal_import_game_list').showModal()
  }

  const handleDeleteGame = (gameId, gameType) => {
    console.log(gameId);
    console.log(gameType);
    const data = {
      gameId: gameId,
      gameType: gameType
    }
    insertDataWithParams("/mysql/delete-game-profile", data)
      .then(res => {
        if(res.success){
          fetchGetAllGameProfile();
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="pt-8 pl-24 pr-52 w-full">
      <div>
        <p className="text-2xl font-semibold">ยินดีต้อนรับสู่ Playground Editor</p>
        <p className="text-md mt-2 font-sans font-thin flex">ดึงดูดลูกค้าให้มีส่วนร่วมกับร้านของคุณ ผ่านการเล่นเกมบน
          <p className="ml-1 font-normal">LINE SHOPPING</p>
        </p>
      </div>
      {/* <p className="mt-10 text-lg text-slate-500">เกมที่เลือก</p>
      <p className="text-sm text-blue-600 -mt-1">แบ่งเป็น 3 ประเภท เลือกให้ทำงานได้ครั้งละ 1 เกมต่อประเภทเท่านั้น</p> */}
      <div className="mt-6 mb-8">
        <SelectTools
          toolList={toolList}
          currentTool={currentTool}
          setCurrentTool={setCurrentTool} />
      </div>

      {gameCreatedList.length > 0 &&
        <ModalGameCreatedList
          gameCreatedList={gameCreatedList}
          setGameCreatedList={setGameCreatedList}
          setIsImportGame={setIsImportGame}
          activityType={activityType}
          gameAccept={gameAccept}
          findCurrentGamePick={findCurrentGamePick} />
      }

      {/* เลือกเกมที่ใช้งาน */}
      {currentTool === 0 && <div className="w-full mt-4 grid grid-cols-12 gap-x-3">

        {/* เกมประจำหน้าร้าน */}
        <CardPickGame gamePick={regularGamePick}
          textHeader={textHeader}
          gameAcceptIndex={0}
          displayImportGameModal={displayImportGameModal} />

        {/* เกมในไลฟ์ */}
        <CardPickGame gamePick={liveGamePick}
          textHeader={textHeader}
          gameAcceptIndex={1}
          displayImportGameModal={displayImportGameModal} />

        {/* เกมพิเศษเฉพาะช่วง */}
        <CardPickGame
          textHeader={textHeader}
          gameAcceptIndex={2}
          displayImportGameModal={displayImportGameModal} />

        {/* <div className="col-span-4 pb-6">
          <p className="flex">เกมพิเศษเฉพาะช่วง <PiConfettiBold className="text-red-400 ml-2 text-lg" /> </p>
          <div className="pt-2 bg-white border border-slate-200 rounded-xl hover:drop-shadow-md
          drop-shadow-sm h-full flex text-slate-400 hover:underline cursor-pointer transition-all duration-100 ease-linear"
            onClick={() => displayImportGameModal(2)}>
            <p className="mx-auto my-[55%] text-xl">เพิ่มเกม</p>
          </div>
        </div> */}
      </div>
      }

      {/* เกมที่สร้างไว้ */}
      {currentTool == 1 &&
        <div className="w-full">
          <div className="flex justify-between">
            <p className="text-xl text-slate-600">เกมของคุณ</p>
            <BsFilterLeft className="text-3xl cursor-pointer text-green-600 hover:text-green-800" />
          </div>
          <div className="w-full grid grid-cols-12 mt-2 gap-4">
            {gameCreatedList.length > 0 && gameCreatedList.map((list, index) =>
              <div key={index} className="col-span-3">
                <div className="pt-2 bg-white rounded-xl cursor-pointer drop-shadow-sm hover:drop-shadow-md">
                  <div className="relative">
                    <RiDeleteBin6Line className="absolute top-2 right-4 text-lg text-slate-600"
                      onClick={() => handleDeleteGame(list.gameId, list.gameType)} />
                  </div>
                  <img src={list.imageSrc}
                    className="object-cover mx-auto p-2 h-[200px]"
                    onClick={() => navigate(`/activities/select-game/game-editor/${list.gameId}`)} />
                  <div className="border-t-2 border-t-slate-200 w-full rounded-b-lg p-2 mt-1.5 flex flex-col">
                    <p className="font-semibold text-green-600">{list.title}</p>
                    <p className="text-slate-500 text-xs mt-1">แก้ไขล่าสุด {list.lastEdited}</p>
                    <div className="text-sm mt-0.5">
                      <div className={`${list.status === "กำลังใช้งาน" && "bg-green-200"} ${list.status === "ปิดการใช้งาน" && "bg-orange-200"} 
                      ${list.status === "ไม่สาธารณะ" && "bg-blue-200"} 
                      w-fit px-2 py-1 rounded-full`}>
                        <p className={`${list.status === "กำลังใช้งาน" && "text-green-700"} ${list.status === "ปิดการใช้งาน" && "text-orange-500"}
                      ${list.status === "ไม่สาธารณะ" && "text-blue-600"} 
                       text-xs`}>{list.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>}

      {/* สร้างเกม */}
      {currentTool == 2 && <div className="w-full grid grid-cols-12 mt-6 gap-x-4">
        <div className="col-span-9 rounded-md drop-shadow-sm text-slate-800 h-fit">
          <p className="font-semibold">ตัวเลือกเกม</p>
          <GameChoices />
        </div>
      </div>}
    </div>
  )
}
export default SelectGame