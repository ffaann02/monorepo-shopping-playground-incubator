import { useEffect, useState } from "react";
import { EndPoint, useDataFetch } from "../../hooks/useDataFetch";
import "./MemoryCard/card.css";
import Card from "./MemoryCard/Card";
import { GiCardPickup } from "react-icons/gi";
import { LuTimer } from "react-icons/lu";
import { ImMobile } from "react-icons/im";
import { LuClipboardCheck } from "react-icons/lu";
import { GrAnnounce } from "react-icons/gr";
import io from "socket.io-client"
import CountdownTimer from "./MemoryCard/CountdownTimer";
import { useUserContext } from "../../contexts/UserContext";

const COUNT_DOWN = 3;
const socket = io.connect(EndPoint, {transports: ['websocket', 'polling', 'flashsocket']});

const MemoryCard = ({ gameId }) => {
    const { fetchDataWithParams } = useDataFetch();
    const [cardsState, setCardsState] = useState([]);
    const [cards, setCards] = useState(null);
    const [originCards, setOriginalCards] = useState(null);
    const [decoration, setDecoration] = useState(null);
    const [attempt, setAttempt] = useState(0);

    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // State to store the elapsed time in seconds
    const [countDown, setCountDown] = useState(COUNT_DOWN);
    const [section, setSection] = useState(0);
    const [userId, setUserId] = useState("Faan2");
    const [realtimeData, setRealtimeData] = useState(null);
    const [conditions, setConditions] = useState(null);
    const [gameTracker, setGameTracker] = useState(null);
    
    const {userProfile} = useUserContext();


    useEffect(() => {
        if (gameId) {
            fetchDataWithParams("/firebase/get-game-setting", { gameId })
                .then((response) => {
                    // console.log(response.conditionTime);
                    console.log(response);

                    // Map the data to add the 'time' property to each item in conditionsTime
                    const conditionsWithTime = Object.keys(response.conditionTime).reduce((acc, key) => {
                        acc[key] = {
                            ...response.conditionTime[key],
                            time: parseInt(response.conditionTime[key].minute) * 60 + parseInt(response.conditionTime[key].second)
                        };
                        return acc;
                    }, {});
                    setCards(response.cards);
                    setOriginalCards(response.cards);
                    setConditions(conditionsWithTime);
                    console.log(conditionsWithTime);
                })
                .catch((error) => {
                    console.error("Error fetching selected giveaways:", error);
                });
            fetchDataWithParams("/firebase/game_decoration", { gameId })
                .then((res) => {
                    console.log(res);
                    setDecoration(res);
                })
                .catch((error) => {
                    console.error("Error get game setting:", error);
                });
        }
    }, []);
    useEffect(() => {
        console.log("card ready");
        if (cards) {
            const cardsData = cards.map((card) => ({
                ...card,
                order: Math.floor(Math.random() * cards.length),
                isFlipped: false,
            }));
            console.log(cardsData);
            cardsData.map((card) => { console.log(card.order) })
            setCardsState(cardsData);
        }
    }, [cards]);

    useEffect(() => {
        if (countDown > 0) {
            return;
        }
        let interval;
        if (isPlaying) {
            console.log("start timer");
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying, countDown]);

    // kep first card info
    let [firstCard, setFirstCard] = useState(null);
    // is it first click?
    let [secondClick, setSecondClick] = useState(false);
    // set flag to wait for 1500ms
    let [wait, setWait] = useState(false);
    // functions
    const checker = async (card) => {
        setAttempt(attempt + 1);
        if (card.name === firstCard.name) {
            console.log("match");
            card["passed"] = true;
            firstCard["passed"] = true;
            changeCardStatusHandler(card);
            changeCardStatusHandler(firstCard);
        } else {
            setWait(true);
            setTimeout(() => {
                changeCardStatusHandler(card);
                changeCardStatusHandler(firstCard);
                setWait(false);
            }, 1000);
        }
        if (cardsState.every((card) => card.passed)) {
            setTimeout(() => {
                setTime(elapsedTime);
                setElapsedTime(0);
                setIsPlaying(false);
                handlePossibleResultGift();
                document.getElementById("modal_result_reward_memory_card").showModal();
            }, 1000);
        }
    };

    const changeCardStatusHandler = async (clickedCard) => {
        if (!clickedCard.passed) clickedCard.isFlipped = !clickedCard.isFlipped;
        let index = cardsState.findIndex((card) => card.id === clickedCard.id);
        let newState = [...cardsState];
        newState.splice(index, 1, clickedCard);
        await setCardsState(newState);
    };

    const handleClick = async (e, clickedCard) => {
        if (!isPlaying) {
            console.log("can't play");
            return;
        }
        if (wait) {
            return;
        }
        if (!secondClick) {
            // Set the first card and enable second click
            await setFirstCard(clickedCard);
            await setSecondClick(true);
            changeCardStatusHandler(clickedCard);
        } else {
            // If the clicked card is the same as the first card, return without doing anything
            if (clickedCard === firstCard) {
                return;
            }

            // Disable second click, change card status, and check for a match
            await setSecondClick(false);
            changeCardStatusHandler(clickedCard);
            checker(clickedCard);
            // Reset the first card
            setFirstCard(null);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            console.log(isPlaying);
            console.log(countDown);
            if (countDown === 0) {
                // If countdown reaches 0, start the game
                handleStartGame();
            } else if (countDown > 0) {
                // If countdown is greater than 0 and game is not yet started, decrement the countdown
                const countdownInterval = setInterval(() => {
                    setCountDown((prevCountDown) => prevCountDown - 1);
                }, 1000);

                // Clear the countdown interval when countdown reaches 0 or game starts
                return () => clearInterval(countdownInterval);
            }
        }
    }, [countDown, isPlaying]);

    const handleStartGame = () => {
        console.log("game start");
        setIsPlaying(true);
        setElapsedTime(0);
        setTime(0);
    };

    const toMinSec = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleAcceptReward = () => {
        console.log("bye");
        handleSendResultToGameRoom(time, attempt);
        document.getElementById("modal_result_reward_memory_card").close();
        setAttempt(0);
        setCountDown(COUNT_DOWN);
        setIsPlaying(false);
        setElapsedTime(0);
        const shuffledCards = cards.map((card) => ({
            ...card,
            order: Math.floor(Math.random() * cards.length),
            isFlipped: false,
        }));
        setCardsState(shuffledCards);
    };

    // useEffect(()=>{
    //     let inputId = prompt("Enter your user id");
    //     setUserId(inputId);
    // },[])

    useEffect(() => {
        if(userProfile){
            console.log("hello");
            socket.emit('join_game_memory', {
                userId: userProfile.userId,
                name: userProfile.displayName,
                image: userProfile.pictureUrl,
                gameId: gameId
            });
        }
    }, [userProfile])

    const handleSendResultToGameRoom = (result_time, attempt) => {
        console.log("send result");
        socket.emit('game_memory_player_send_result', {
            userId: userId,
            gameId: gameId,
            time: result_time,
            attempt: attempt,
        })
    }
    const [resultGift, setResultGift] = useState(null);
    const handlePossibleResultGift = async () => {
        console.log("handlePossibleResultGift");
        let selectedGift = null;
        Object.keys(conditions).map((key) => {
            if (time <= conditions[key].time) {
                selectedGift = conditions[key].selectedGift;
            }
        });
        setResultGift(selectedGift);
    }

    useEffect(() => {
        const timestamp = Date.now().toString();
        // const userId = timestamp;
        socket.on('game_memory_player_game_result', (data) => {
            console.log(data);
            setGameTracker(data.tracker);
            // Sort the data based on the best_play_time key, with null values moved to the bottom
            const sortedData = data.room.sort((a, b) => {
                // Move users with null best_play_time to the bottom
                if (a.best_play_time === null && b.best_play_time !== null) {
                    return 1;
                } else if (a.best_play_time !== null && b.best_play_time === null) {
                    return -1;
                } else {
                    // Sort users based on best_play_time
                    return a.best_play_time - b.best_play_time;
                }
            });
            setRealtimeData(sortedData);
        });

        socket.on('game_memory_time_up', (data) => {
            alert("Time's up!");
            // Perform Push Message;
        })
        
        socket.on('room_not_found', () => {
            alert("Room not found");
        });

        socket.on("update_room_status", (data) => {
            setGameTracker(data.tracker);
        });

    }, [socket]);

    return (
        <>
            {cards && decoration &&
                <div className="relative">
                    {isPlaying && countDown != 0 && (
                        <div className="w-full h-full fixed bg-black z-[20] bg-opacity-55 flex">
                            <p className="text-white m-auto mt-[50%] text-[9rem]">{countDown}</p>
                        </div>
                    )}
                    <dialog id="modal_result_reward_memory_card" className="modal">
                        <div className="modal-box p-4 pt-3 rounded-2xl bg-base-100">
                            <form method="dialog" className="absolute right-0 top-0">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                </button>
                            </form>
                            <h3 className="font-semibold text-2xl text-center flex justify-center">
                                <GrAnnounce className="text-orange-400" />
                                <p className="ml-2 text-slate-700">ยอดเยี่ยม !</p>
                            </h3>
                            <div className="text-center border-b pb-2">
                                คุณใช้เวลา {toMinSec(time)} และ เล่น {attempt} รอบ
                            </div>
                            {/* <div className="px-4 mt-2 text-sm text-center">
                                คุณอาจได้รับรางวัล
                            </div> */}
                            {resultGift && <div className="mt-4">
                                <div className="rounded-xl border p-2 mt-1 mx-4 drop-shadow-sm bg-white">
                                    <img src={resultGift.image} />
                                </div>
                                <p className="text-blue-600 px-4 text-center mt-1">{resultGift.name}</p>
                            </div>}
                            <div className="px-4 text-xs mt-1 text-slate-600">
                                * คุณต้องรักษาอันดับให้ไว้ก่อนเวลาสิ้นสุด และซื้อสินค้าภายในเวลาที่กำหนด เพื่อรับของแถม
                            </div>

                            <div className="mx-4 mt-2 gap-x-2 flex justify-center">
                                <button
                                    className="border px-4 py-2 rounded-lg text-green-600 tracking-wide border-green-500 drop-shadow-sm"
                                    onClick={handleAcceptReward}
                                >
                                    ตกลง
                                </button>
                            </div>
                        </div>
                    </dialog>
                    <div>
                        <p className="text-2xl font-semibold text-green-600 tracking-wide text-center">
                            เกมการ์ดความจำ
                        </p>
                        <p className="text-sm font-semibold text-slate-500 tracking-wide text-center mt-0.5">
                            ร้าน TEST INCUBATOR 4
                        </p>
                        <div className="w-ful px-4 gap-x-6 mt-4">
                            <div className="flex justify-center gap-x-4 border-b border-slate-300 pb-1.5">
                                <button className={`flex ${section === 0 && "text-green-600 border-green-400"} ${section === 0 ? "border-b-2" : "border-b-transparent"} -mb-2 px-2`}
                                    onClick={() => { setSection(0) }}>
                                    <ImMobile className="mt-1 mr-1" /> เล่นเกม
                                </button>
                                <button className={`flex ${section === 1 && "text-green-600 border-green-400"} ${section === 1 ? "border-b-2" : "border-b-transparent"} -mb-2 px-2`}
                                    onClick={() => { setSection(1) }}>
                                    <LuClipboardCheck className="mt-1 mr-1" />
                                    บอร์ด
                                </button>
                            </div>
                        </div>
                        {section === 0 && <div className="mt-6 mx-2 flex gap-x-4 justify-center">
                            <div className="flex relative flex-col items-center">
                                <div className="bg-green-100 border border-slate-400 w-fit h-fit p-1 rounded-full absolute z-[10] left-0 top-0">
                                    <LuTimer className="text-green-600 text-sm" />
                                </div>
                                <div className="bg-green-100 p-1.5 border border-green-400 w-20 h-20 rounded-full z-[5] flex shadow-green-300 shadow-md">
                                    <p className="text-lg font-semibold tracking-wide text-center m-auto text-slate-500">
                                        {toMinSec(elapsedTime)}
                                    </p>
                                </div>
                                <div className="mt-1 text-slate-600 font-semibold">เวลา</div>
                            </div>
                            <div className="flex relative flex-col items-center">
                                <div className="bg-blue-100 border border-slate-400 w-fit h-fit p-1 rounded-full absolute z-[10] left-0 top-0">
                                    <LuTimer className="text-blue-600 text-sm" />
                                </div>
                                <div className="bg-blue-100 p-1.5 border border-blue-400 w-20 h-20 rounded-full z-[5] flex shadow-blue-300 shadow-md">
                                    <p className="text-xl font-semibold tracking-wide text-center m-auto text-slate-500">
                                        {attempt}
                                    </p>
                                </div>
                                <div className="mt-1 text-slate-600 font-semibold">รอบการเล่น</div>
                            </div>
                        </div>}
                    </div>
                    {section === 0 && <div className="p-3 mt-4 w-full grid grid-cols-4 h-[35vh] gap-2">
                        {cardsState?.map((card) => {
                            return (
                                <Card
                                    key={card.id}
                                    card={card}
                                    onClick={(e) => handleClick(e, card)}
                                    decoration={decoration}
                                />
                            );
                        })}
                    </div>}
                    {section === 0 && <div className="flex justify-center">
                        <button
                            className="bg-green-600 px-4 py-2 drop-shadow-sm rounded-2xl text-white"
                            onClick={() => {
                                setIsPlaying(true);
                            }}
                        >
                            เริ่มเล่นเกม
                        </button>
                    </div>}
                    {section === 1 && realtimeData &&
                        <div className="px-4 mt-4">
                            <div className="text-center flex flex-col">
                                <p className="text-sm border-b w-fit mx-auto pb-0.5 mb-1 border-blue-400 px-1">เกมจะสิ้นสุดลงใน</p>
                                {gameTracker.active ? <CountdownTimer gameTracker={gameTracker}/>:<p className="text-2xl text-green-600 font-semibold">ยังไม่เปิดใช้งาน</p>}
                            </div>
                            <p className="ml-0.5 text-slate-600 mt-4">ตารางคะแนน</p>
                            <div className="overflow-x-auto mt-1 drop-shadow-sm">
                                <table className="table bg-white rounded-md">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th className="text-sm font-semibold">ลำดับ</th>
                                            <th className="text-sm font-semibold">ผู้เล่น</th>
                                            <th className="text-sm font-semibold">เวลา</th>
                                            <th className="text-sm font-semibold">จำนวนครั้ง</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {realtimeData.map((player, index) => (
                                            <tr key={index}>
                                                <th className="text-xs text-slate-600">{index + 1}</th>
                                                <td>
                                                    <div className="flex">
                                                        <img src={player.image} className="w-10 h-10 p-0.5 border rounded-md" />
                                                        <p className="my-auto ml-2 text-blue-600">{player.name}</p>
                                                    </div>
                                                </td>
                                                <td>{!player.best_play_time ? "-" : toMinSec(player.best_play_time)}</td>
                                                <td>{player.attempt === 0 ? "-" : (player.attempt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {<div className="mt-4">
                                <p className="ml-0.5 text-slate-600">ของรางวัล</p>
                                <div className="overflow-x-auto mt-1 drop-shadow-sm">
                                    <table className="table bg-white rounded-md">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th className="text-sm font-semibold">ลำดับ</th>
                                                <th className="text-sm font-semibold">รายการ</th>
                                                <th className="text-sm font-semibold text-center">
                                                    เงื่อนไข
                                                    <br /> <p className="text-xs">(ภายในเวลา)</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(conditions).map((key, index) => (
                                                <tr key={key}>
                                                    <th className="text-xs text-slate-600">{index + 1}</th>
                                                    <td>
                                                        <div className="flex">
                                                            <img src={conditions[key].selectedGift.image} className="w-10 h-10 p-0.5 border rounded-md" alt={conditions[key].selectedGift.name} />
                                                            <p className="my-auto ml-2 text-blue-600 text-xs">{conditions[key].selectedGift.name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{toMinSec(conditions[key].time)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>}
                        </div>
                    }
                </div>}
        </>
    );
};
export default MemoryCard;
