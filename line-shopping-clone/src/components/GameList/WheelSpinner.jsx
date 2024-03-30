import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDataFetch } from "../../hooks/useDataFetch";
import { GrAnnounce } from "react-icons/gr";

const WheelSpinner = ({ gameId, orderNumber, conditionMatch }) => {

    const [wheelData, setWheelData] = useState(null);
    const [giftList, setGiftList] = useState([]);
    const [tickerAmount, setTickerAmount] = useState(1);
    const [decoration, setDecoration] = useState();
    const { fetchDataWithParams, insertDataWithParams } = useDataFetch();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(-1);
    const [isOpenList, setIsOpenList] = useState(false);
    const [resultGift, setResultGift] = useState({});

    useEffect(() => {
        if (gameId) {
            fetchDataWithParams("/mysql/get-selected-giveaways", { gameId })
                .then((response) => {
                    console.log(response);
                    setGiftList(response.giveaway);
                    const newData =
                        response.giveaway.map((item, index) => ({
                            option: index.toString(),
                            image: { uri: item.image },
                            style: { backgroundColor: "#e8ffe8", textColor: "black" }
                        }))
                    setWheelData(newData);
                })
                .catch((error) => {
                    console.error("Error fetching selected giveaways:", error);
                })
                .then(() => {
                    fetchDataWithParams("/mysql/get-game-condition", { gameId })
                        .then((response) => {
                            console.log(response); // Check if you're receiving the data properly
                            console.log(response.decoration)
                            setDecoration(response.decoration);
                        })
                        .catch((error) => {
                            console.error("Error fetching game condition data:", error);
                        });
                })
                .then(() => {
                    console.log(giftList);
                });
        }
    }, []);
    const handleSpinClick = () => {
        if (tickerAmount <= 0) {
            return;
        }
        setTickerAmount(tickerAmount - 1);
        if (!mustSpin) {
            // Ensure giftList is not empty
            if (giftList.length === 0) {
                console.error("Gift list is empty");
                return;
            }

            // Calculate total drop rate
            const totalDropRate = giftList.reduce((acc, item) => {
                // Ensure drop_rate is a number, or default to 0 if not a valid number
                const dropRate = parseFloat(item.drop_rate);
                return isNaN(dropRate) ? acc : acc + dropRate;
            }, 0);

            // Ensure totalDropRate is not 0
            if (totalDropRate === 0) {
                console.error("Total drop rate is 0");
                return;
            }

            // Generate a random number between 0 and totalDropRate
            const randomNumber = Math.random() * totalDropRate;

            // Initialize a variable to keep track of the cumulative drop rate
            let cumulativeDropRate = 0;

            // Initialize variables to store the selected item and prizeNumber
            let selectedPrize = null;
            let selectedPrizeNumber = null;

            giftList.some((item, index) => {
                const dropRate = parseFloat(item.drop_rate);
                cumulativeDropRate += isNaN(dropRate) ? 0 : dropRate;

                if (randomNumber <= cumulativeDropRate) {
                    selectedPrize = item;
                    selectedPrizeNumber = index;
                    return true; // Exit loop
                }
                return false;
            });
            console.log("Selected Prize:", selectedPrize);
            console.log("Prize Number:", selectedPrizeNumber);
            setPrizeNumber(selectedPrizeNumber);
            setMustSpin(true);
            setResultGift(selectedPrize);
        }
    };

    const handleStopSpinning = () => {
        document.getElementById("modal_result_reward").showModal();
        setMustSpin(false);
    }

    const handleAcceptReward = () => {
        document.getElementById("modal_result_reward").close();
        console.log("Accept");
        console.log(resultGift);
        const data = {
            gameId: gameId,
            orderNumber: orderNumber,
            conditionMatch: parseInt(conditionMatch),
            resultGift: resultGift
        }
        insertDataWithParams('/firebase/insert-reward-history', data )
            .then((response) => {
                console.log(response);
                
            })
            .catch((error) => {
                console.error("Error insert reward history:", error);
            })
    }

    return (
        <>
            <dialog id="modal_result_reward" className="modal">
                <div className="modal-box p-4 pt-3 rounded-2xl bg-base-100">
                    {/* <form method="dialog" className="absolute right-0 top-0">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form> */}
                    <h3 className="font-semibold text-2xl text-center flex justify-center">
                        <GrAnnounce className="text-orange-400" />
                        <p className="ml-2 text-slate-700">ยินดีด้วย !</p>
                    </h3>
                    <div className="text-center">คุณได้รับ
                    </div>
                    <div className="rounded-xl border p-2 mt-2 mx-4 drop-shadow-sm bg-white">
                        <img src={resultGift.image} />
                    </div>
                    <p className="text-blue-600 px-4 text-center mt-2">{resultGift.name}</p>

                    <div className="mx-4 mt-2 gap-x-2 flex justify-center">
                        <button className="border px-4 py-2 rounded-lg text-green-600 tracking-wide border-green-500 drop-shadow-sm"
                            onClick={handleAcceptReward}>
                            รับรางวัล
                        </button>
                    </div>
                </div>
            </dialog>
            {wheelData && (
                <div className="w-full overflow-hidden">
                    <div>
                        <p className="text-2xl font-semibold text-green-600 tracking-wide text-center">
                            สุ่มวงล้อ {gameId}
                        </p>
                        <p className="text-sm font-semibold text-slate-500 tracking-wide text-center mt-0.5">
                            ร้าน TEST INCUBATOR 4
                        </p>
                    </div>
                    <div className="w-full flex flex-col mt-6 justify-center">
                        <p className="text-lg font-semibold text-slate-500 tracking-wide text-center">
                            สิทธิคงเหลือ: {tickerAmount}
                        </p>
                        <div className="w-full flex">
                            <div className="w-fit mt-2 mx-auto">
                                <Wheel
                                    mustStartSpinning={mustSpin}
                                    prizeNumber={prizeNumber}
                                    disableInitialAnimation={true}
                                    data={wheelData}
                                    onStopSpinning={handleStopSpinning}
                                    {...decoration}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-center mt-6">
                        <button className="bg-green-600 px-4 py-2 drop-shadow-sm rounded-2xl text-white" onClick={handleSpinClick}>
                            หมุนวงล้อ x1
                        </button>
                    </div>
                    <div className="w-full mt-6">
                        <div className="flex bg-white px-3.5 py-3 rounded-t-lg border-b" onClick={() => { setIsOpenList(prev => !prev) }}>
                            <p className="">ลิสต์ของรางวัล</p>
                            {isOpenList ? <FaChevronDown className="ml-auto my-auto" /> : <FaChevronUp className="ml-auto my-auto text" />}
                        </div>
                        {!isOpenList ? <div className="overflow-x-auto">
                            <table className="table bg-white rounded-md rounded-t-none drop-shadow-sm w-full">
                                <thead>
                                    <tr>
                                        <th>รายการ</th>
                                        <th className="text-right">จำนวนคงเหลือ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {giftList &&
                                        giftList.map((item, index) => (
                                            <tr key={index}>
                                                <td className="flex">
                                                    <img
                                                        className="w-10 h-10 p-1 rounded-md border"
                                                        src={item.image}
                                                    />
                                                    <p className="ml-2 text-xs my-auto text-blue-800">
                                                        {item.name}
                                                    </p>
                                                </td>
                                                <td className="text-right text-xs text-slate-600">
                                                    {item.amount}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div> : <div className="w-full px-4 py-2 text-xs drop-shadow-sm text-slate-500 bg-white rounded-b-md">กดเพื่อดูรายการของรางวัล</div>}
                    </div>
                </div>
            )}
        </>
    );
};
export default WheelSpinner;
