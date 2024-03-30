// #4068cb
// #e3eaf4
// #fbaba4
// #facdcc
// #ffea91
import React, { useState, useEffect } from "react"
import { Wheel } from "react-custom-roulette";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import Workspace from "../gameEditorLayout/shared/Workspace";
import SelectTools from "../gameEditorLayout/shared/SelectTools";
import SettingTools from "../gameEditorLayout/shared/SettingTools";
import { FaMobileAlt } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { WheelProvider, useWheelContext } from "../../../contexts/WheelContext";
import { useDataFetch } from "../../../hooks/useDataFetch";

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
];


const WheelSpinner = ({ gameId }) => {

    const { loading, fetchData, fetchDataWithParams, updateDataWithParams } = useDataFetch();
    const [wheelData, setWheelData] = useState([]);
    const [giftType, setGiftType] = useState('item'); // item, discount
    const [giftList_Item, setGiftList_Item] = useState(null);
    const [isImportingGiftList, setImportingGiftList] = useState(false);

    const { gameConditionData, setGameConditionData } = useWheelContext();

    // Fetch data
    useEffect(() => {
        if (gameId) {
            console.log(gameId)
            fetchDataWithParams("/mysql/get-selected-giveaways", { gameId })
                .then(response => {
                    console.log(response);
                    setGiftList_Item(response.giveaway);
                    setGiftList_Discount(response.discount);
                })
                .catch(error => {
                    console.error("Error fetching selected giveaways:", error);
                }).then(() => {
                    fetchDataWithParams("/mysql/get-game-condition", { gameId })
                        .then(response => {
                            console.log(response); // Check if you're receiving the data properly
                            setGameConditionData(response); // Assuming response is already the data
                            setWheelProps(response.decoration);
                        })
                        .catch(error => {
                            console.error("Error fetching game condition data:", error);
                        });

                })
        }
    }, [])

    // Fetch data (when toggle Import giftlists)
    useEffect(() => {
        if (isImportingGiftList) {
            fetchData("/product/get-giveaways-list")
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error("Error fetching game condition data:", error);
                });
        }
    }, [isImportingGiftList])

    useEffect(() => {
        if (giftList_Item) {
            const newData = giftType === 'item' ?
                giftList_Item.map((item, index) => ({
                    option: index.toString(),
                    image: { uri: item.image },
                    style: { backgroundColor: "#e8ffe8", textColor: "black" }
                })) :
                giftList_Discount.map((discount, index) => ({
                    option: discount.code,
                    style: { backgroundColor: "#e8ffe8", textColor: "black" },
                }));
            setWheelData(newData);
        }
        // Set empty wheel data dynamicly
        if (giftList_Item && giftList_Item.length >= 1 && giftList_Item.length <= emptyWheelData.length) {
            const formattedEmptyWheelData = giftList_Item.map((item, index) => ({
                index: index,
                image: { uri: item.image },
                style: { backgroundColor: "#e8ffe8", textColor: "black" }
            }));
            const updatedEmptyWheelData = [...emptyWheelData];
            for (let i = 0; i < giftList_Item.length; i++) {
                updatedEmptyWheelData[i] = formattedEmptyWheelData[i];
            }
            setEmptyWheelData(updatedEmptyWheelData);
        }
    }, [giftList_Item]);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    const [giftList_Discount, setGiftList_Discount] = useState([
        {
            name: 'ILOVELINE1',
            amount_total: 10,
            amount_left: 10,
            giveaway_amount: 5,
        },
        {
            name: 'ILOVELINE2',
            amount_total: 20,
            amount_left: 20,
            giveaway_amount: 5,
        },
        {
            name: 'ILOVELINE3',
            amount_total: 30,
            amount_left: 30,
            giveaway_amount: 5,
        },
    ]);

    const [limitTicket, setLimitTicket] = useState({
        checked: false,
        amount: 0,
    });

    const [currentTool, setCurrentTool] = useState(1);

    const [emptyWheelData, setEmptyWheelData] = useState([
        {
            option: "เพิ่มรางวัล",
            style: { backgroundColor: "#gray", textColor: "black" }
        },
        {
            option: "เพิ่มรางวัล",
            style: { backgroundColor: "gray", textColor: "black" }
        },
        {
            option: "เพิ่มรางวัล",
            style: { backgroundColor: "gray", textColor: "black" }
        },
    ])

    const [wheelProps, setWheelProps] = useState({
        outerBorderWidth: 8,
        outerBorderColor: "#00B900",
        radiusLineWidth: 6,
        radiusLineColor: "#00B900",
        innerRadius: 6,
        innerBorderColor: "#00B900",
        innerBorderWidth: 4,
        spinDuration: 0.5,
        pointerProps: {
            src: null,
            style: {}
        }
    });

    const updateProps = (newProps) => {
        setWheelProps(newProps);
    };

    const [gameName, setGameName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [newGameName, setNewGameName] = useState("");

    // Simulate fetching the game name initially
    useEffect(() => {
        fetchDataWithParams("/mysql/get-game-profile", { gameId })
            .then(response => {
                console.log(response);
                setGameName(response.gameName);
            })
            .catch(error => {
                console.error("Error fetching game profile:", error);
            })
    }, []);

    const fakeFetchGameName = () => {
        // Simulated fetch, replace this with your actual fetch
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Initial Game Name");
            }, 1000);
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setNewGameName(gameName);
    };

    const handleSave = () => {
        console.log("Updated Game Name:", newGameName);
        const formatData = {
            gameId: "ws-001",
            gameName: newGameName
        }
        updateDataWithParams("/mysql/update-game-name", formatData)
            .then(response => {
                console.log(response);
                setGameName(newGameName);
                setIsEditing(false);
            })
            .catch(error => {
                console.error("Error update game name:", error);
            });
    };

    const handleChangeGameName = (event) => {
        setNewGameName(event.target.value);
    };

    const { updateWheelState } = useWheelContext();

    const handleSaveChange = () => {
        console.log(updateWheelState);
        const formatData = {
            gameId: "ws-001",
            data: updateWheelState
        }
        updateDataWithParams("/mysql/update-game-condition", formatData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error("Error update game condition:", error);
            });
    }

    return (
        <div className={`px-16 w-full ${!loading ? "block" : "hidden"}`}>
            <div className="flex justify-between">
                <div>
                    <p className="text-2xl font-semibold">เกมวงล้อ</p>
                    <p className="text-md font-thin font-sans flex">
                        ตั้งค่าและจัดการเกมบนหน้าร้านคุณใน
                        <p className="ml-1 font-normal">LINE SHOPPING</p>
                    </p>
                </div>
                <div className="my-auto" onClick={handleSaveChange}>
                    <button className="p-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md">บันทึกการเปลี่ยนแปลง</button>
                </div>
            </div>
            <div className="w-full mt-4 grid grid-cols-12 gap-x-4 gap-y-3">
                <SelectTools
                    toolList={toolList}
                    currentTool={currentTool}
                    setCurrentTool={setCurrentTool}
                />
                <div className="bg-white 2xl:col-span-6 xl:col-span-7 rounded-md drop-shadow-sm h-fit">
                    <div className="pb-4 px-0 pt-0 w-full relative flex flex-col">
                        <div className="w-full px-2 py-1.5 flex gap-x-1 border-b justify-between">
                            <div className="flex-1 relative">
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            value={newGameName}
                                            onChange={handleChangeGameName}
                                            className="text-slate-500 placeholder:text-slate-300 w-full border h-full pl-2 pr-20 py-1 rounded-sm
                            focus:border focus:border-slate-400 focus:drop-shadow-md focus:outline-none"
                                            placeholder="Please Input"
                                        />
                                        <button
                                            onClick={handleSave}
                                            className="absolute inset-y-0 right-0 py-1 mr-2.5 rounded-r-sm text-slate-400 text-sm hover:underline"
                                        >
                                            บันทึก
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            value={gameName}
                                            readOnly
                                            className="text-slate-500 placeholder:text-slate-300 w-full border h-full pl-2 pr-20 py-1 rounded-sm
                            focus:border focus:border-slate-400 focus:drop-shadow-md focus:outline-none"
                                            placeholder="Please Input"
                                        />
                                        <button
                                            onClick={handleEdit}
                                            className="absolute inset-y-0 right-0 py-1 mr-2.5 rounded-r-sm text-slate-400 text-sm hover:underline"
                                        >
                                            แก้ไข
                                        </button>
                                    </>
                                )}
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


                        <div className="w-fit mx-auto mt-2" onClick={handleSpinClick}>
                            {wheelData && wheelData.length >= 3 ?
                                <Wheel
                                    mustStartSpinning={mustSpin}
                                    prizeNumber={prizeNumber}
                                    data={wheelData}
                                    disableInitialAnimation={true}
                                    onStopSpinning={() => {
                                        setMustSpin(false);
                                    }}
                                    {...wheelProps} // Spread wheel customization props
                                /> :
                                <Wheel
                                    mustStartSpinning={mustSpin}
                                    prizeNumber={prizeNumber}
                                    data={emptyWheelData}
                                    disableInitialAnimation={true}
                                    onStopSpinning={() => {
                                        setMustSpin(false);
                                    }}
                                    {...wheelProps} // Spread wheel customization props
                                />}
                        </div>
                    </div>
                </div>
                {giftList_Item &&
                    <SettingTools
                        gameId={gameId}
                        toolList={toolList}
                        currentTool={currentTool}
                        setCurrentTool={setCurrentTool}
                        giftType={giftType}
                        setGiftType={setGiftType}
                        giftList={giftType === 'item' ? giftList_Item : giftList_Discount}
                        setGiftList={giftType === 'item' ? setGiftList_Item : setGiftList_Discount}
                        limitTicket={limitTicket}
                        setLimitTicket={setLimitTicket}
                        wheelProps={wheelProps}
                        onUpdateProps={updateProps}
                        setImportingGiftList={setImportingGiftList}
                    />}
            </div>
        </div>
    );
};
export default WheelSpinner;
