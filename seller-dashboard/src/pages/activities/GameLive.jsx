import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useDataFetch } from "../../hooks/useDataFetch";
import { GoPeople, GoGift, GoStar, GoStarFill } from "react-icons/go";
import { MdOutlineDiscount, MdOutlineTimer } from "react-icons/md";
import { RiCopperCoinFill, RiCoinsFill } from "react-icons/ri";
import SelectTools from "../../components/gameEditorPage/gameEditorLayout/shared/SelectTools";
import { useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import { IoPlayCircleSharp } from "react-icons/io5";
import { VictoryLine, VictoryPie } from "victory";
import { Chart } from "react-google-charts";
import PlayerLIVE from "../../components/gameEditorPage/PlayerLIVE";


const socket = io.connect(import.meta.env.VITE_SERVER_ENDPOINT);

const toolList = [
    {
        title: "ภาพรวม",
    },
    {
        title: "ผู้เล่น",
    },
    {
        title: "แจกรางวัล",
    },
]

export const data = [
    ["Taskf", "Hours per Day"],
    ["เล่นเกมในไลฟ์", 60],
    ["ดูไลฟ์", 30],
];

export const options = {
    legend: "none",
    pieSliceText: "label",
    pieStartAngle: 100,
    slices: {
        0: { color: "#40A2E3" },
        1: { color: "#74E291" },
    },
};

export const data2 = [
    ["x", "เข้าร่วมเล่นเกมไลฟ์", "ซื้อสินค้าด้วยของแถมขณะไลฟ์"],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
];

export const options2 = {
    hAxis: {
        title: "เวลา",
    },
    vAxis: {
        title: "จำนวนลูกค้า",
    },
    series: [{ color: "#40A2E3", }, { color: "#9BCF53" }],
};

const dumpLogMessage = [
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
    {
        timestamp: 1630603200000,
        message: "User 1234 has joined the game room",
    },
]

const determineGame = (gameId) => {
    if (gameId && gameId.includes('mm')) {
        return "เกมการ์ดความจำ"
    } else {
        // Default to WheelSpinner or any other default game component
        return "";
    }
};

const GameLive = () => {
    const { gameId } = useParams();
    const [currentTool, setCurrentTool] = useState(0);
    const { fetchData, fetchDataWithParams } = useDataFetch();
    const [usersWatchingNow, setusersWatchingNow] = useState([]);
    const [highestScore, sethighestScore] = useState(25);
    const [gameStatus, setGameStatus] = useState(-1); // -1 = ยังไม่สร้างห้อง, 0 = ปิดการใช้งาน, 1 = เปิดใช้งานอยู่

    useEffect(() => {
        // if (gameId) {
        //     fetchDataWithParams("/mysql/get-selected-giveaways", { gameId })
        //         .then(response => {
        //             console.log(response);
        //         })
        //         .catch(error => {
        //             console.error("Error fetching selected giveaways:", error);
        //         })
        // }
        if (gameId) {
            socket.emit("find_game_room", { gameId });
        }
    }, []);

    const [gameTracker, setGameTracker] = useState(null);
    const [realTimeData, setRealtimeData] = useState(null);
    const [logMessages, setLogMessages] = useState([]);

    // Recieve event from sever-socket
    useEffect(() => {
        socket.on("game_room_status", (data) => {
            setGameStatus(data.flag);
        });
        socket.on("update_room_status", (data) => {
            socket.emit("find_game_room", { gameId });
            console.log(data);
            setRealtimeData(data);
            setGameTracker(data.tracker);
        });
    }, [socket]);

    const handleCreateRoom = () => {
        console.log("create_room")
        socket.emit("create_room", { gameId, time: 120 });
    }
    const handleOpenActiveRoom = () => {
        socket.emit("set_room_active", { gameId });
    }
    const handlePauseRoom = () => {
        socket.emit("set_room_inactive", { gameId });
    }
    const fakeData = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 6 }
    ];

    const formatTimestamp = (timestamp) => {
        // Convert timestamp to Date object
        const date = new Date(timestamp);

        // Get the individual components of the date (year, month, day, hours, minutes)
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        // Return formatted date string
        return `${hours}:${minutes}`;
    };

    return (
        <div>
            <div className="pl-24 pr-40 pt-4 pb-10 text-slate-700 w-full">
                <p className="pt-2 text-2xl font-semibold">เกม LIVE Dashboard</p>
                <p className="pt-2 text-md font-sans text-slate-500">
                    ข้อมูลคะแนนของผู้เข้าร่วมเล่นเกมและสินค้าที่เข้าร่วมในกิจกรรมไลฟ์สดครั้งนี้
                </p>
                <div className="mt-6">
                    <SelectTools
                        toolList={toolList}
                        currentTool={currentTool}
                        setCurrentTool={setCurrentTool}
                    />
                </div>
                {currentTool === 0 &&
                    <div className="w-full pt-8 grid grid-cols-12 gap-4">
                        <div className="w-full pt-3 pb-4 px-4 bg-white rounded-md col-span-8 flex flex-col gap-y-2">
                            <div className="">
                                <h2 className="text-xl font-semibold text-slate-600">ข้อมูลเกมไลฟ์</h2>
                                <p className="mt-2 text-sm">เกมไอดี</p>
                                <div className="bg-slate-50 py-2 px-3 rounded-sm">
                                    <p className="text-sm text-slate-500">{gameId}</p>
                                </div>
                                <p className="mt-2 text-sm">ประเภทเกม</p>
                                <div className="bg-slate-50 py-2 px-3 rounded-sm">
                                    <p className="text-sm text-slate-500">{determineGame(gameId)}</p>
                                </div>
                                <p className="mt-2 text-sm">ช่วงเวลาที่เปิด</p>
                                {gameTracker && <div className="bg-slate-50 py-2 px-3 rounded-sm">
                                    <p className="text-sm text-slate-500">
                                        {formatTimestamp(gameTracker.end_time)} - {formatTimestamp(gameTracker.create_time)}
                                    </p>
                                </div>}
                                {/* <p className="mt-2 text-sm">ประเภทเกม</p>
                                <div className="bg-slate-50 py-2 px-3 rounded-sm">
                                    <p className="text-sm text-slate-500">{gameId}</p>
                                </div> */}
                            </div>
                        </div>
                        <div className="w-full pt-3 pb-4 px-4 bg-white rounded-md col-span-4">
                            <h2 className="text-xl font-semibold text-slate-600">สถานะของเกม</h2>
                            <div className="mb-2">
                                {gameStatus === -1 && <div className="text-xs px-2 py-1 mt-0.5 rounded-xl bg-slate-200 w-fit border border-slate-300 text-slate-500">
                                    ยังไม่สร้างห้อง
                                </div>}
                                {gameStatus === 0 && <div className="text-xs px-2 py-1 mt-0.5 rounded-xl bg-red-100 w-fit border border-red-300 text-red-500">
                                    ปิดการใช้งาน
                                </div>}
                                {gameStatus === 1 && <div className="text-xs px-2 py-1 mt-0.5 rounded-xl bg-green-100 w-fit border border-green-300 text-green-600">
                                    กำลังเปิดใช้งาน
                                </div>}
                            </div>
                            <p className="text-sm text-slate-600 mt-4">ตั้งค่าสถานะ</p>
                            {gameStatus === -1 && <button className="w-fit pl-2 pr-1.5 mt-0.5 py-1.5 bg-blue-50 hover:bg-blue-100 border-blue-400 border text-blue-600 rounded-lg flex">
                                สร้างห้อง <IoMdAddCircle className="mt-0.5 text-lg my-auto ml-1" onClick={handleCreateRoom} />
                            </button>}
                            {gameStatus === 0 && <button className="w-fit pl-2 pr-1.5 mt-0.5 py-1.5 bg-green-50 hover:bg-green-100 border-green-400 border text-green-600 rounded-lg flex">
                                เปิดใช้งาน <IoPlayCircleSharp className="mt-0.5 text-lg my-auto ml-1" onClick={handleOpenActiveRoom} />
                            </button>}
                            {gameStatus === 1 && <button className="w-fit pl-2 pr-1.5 mt-0.5 py-1.5 bg-orange-50 hover:bg-orange-100 border-orange-300 border text-orange-600 rounded-lg flex">
                                หยุดการใช้งาน <IoPlayCircleSharp className="mt-0.5 text-lg my-auto ml-1" onClick={handlePauseRoom} />
                            </button>}
                            <p className="text-xs text-slate-500 mt-2">*การตั้งค่าสถานะเกมใหม่จะส่งผลต่อลูกค้าทุกคนที่กำลังใช้งานอยู่</p>
                        </div>
                        <div className="w-full pt-3 pb-4 px-4 bg-white rounded-md col-span-4 flex flex-col gap-y-2 h-fit">
                            <h2 className="text-xl font-semibold text-slate-600">การเล่นเกมในไลฟ์</h2>
                            <div className="w-full">
                                <Chart
                                    chartType="PieChart"
                                    data={data}
                                    options={options}
                                    width={"100%"}
                                    height={"300px"}
                                />
                            </div>
                        </div>
                        <div className="w-full pt-3 pb-4 px-4 bg-white rounded-md col-span-8 flex flex-col gap-y-2 h-fit">
                            <h2 className="text-xl font-semibold text-slate-600">ข้อมูลการมีส่วนร่วม</h2>
                            <div className="w-full">
                                <Chart
                                    chartType="LineChart"
                                    width="100%"
                                    height="300px"
                                    data={data2}
                                    options={options2}
                                />
                            </div>
                        </div>
                    </div>}
                {currentTool === 1 &&
                    realTimeData  && <PlayerLIVE realTimeData={realTimeData} formatTimestamp={formatTimestamp} logMessage={dumpLogMessage}/>}
                {currentTool === 1 && realTimeData===null && 
                    <div className="w-full pt-8 grid grid-cols-12 gap-4 bg-white mt-6 rounded-lg">
                    <div className="col-span-full flex">
                        <p className="text-3xl p-10 mx-auto pb-16 drop-shadow-md text-slate-400">ไม่พบข้อมูลผู้เล่น ?</p>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default GameLive;
