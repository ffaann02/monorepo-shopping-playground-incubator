import React, { useEffect, useState } from 'react'
import { useDataFetch } from "../../hooks/useDataFetch";
import { ImCross } from "react-icons/im";
import { FaRegTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ModalGameCreatedList = ({ gameCreatedList, setGameCreatedList, setIsImportGame, activityType, gameAccept, findCurrentGamePick }) => {

    const { fetchData, insertDataWithParams } = useDataFetch();
    const [gameAcceptableList, setGameAcceptableList] = useState([]);
    const [activeGame, setActiveGame] = useState(null);
    const [updateGameList, setUpdateGameList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const gameAcceptable = gameAccept[activityType];
        const gameLists = gameCreatedList.filter(game => gameAcceptable.includes(game.gameType));
        const pages = gameLists ? Math.ceil(gameLists.length / itemsPerPage) : 1;
        const activeGame = gameLists.find(game => game.rawStatus === "active");
        console.log(gameLists);
        setTotalPages(pages);
        setGameAcceptableList(gameLists);
        setActiveGame(activeGame);
        console.log(activeGame);
    }, [activityType])

    useEffect(() => {
        const activeGame = gameAcceptableList.find(game => game.rawStatus === "active");
        setActiveGame(activeGame);
        setUpdateGameList(gameAcceptableList);
    }, [gameAcceptableList])

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const isCheckboxDisable = (rawStatus) => {
        if (activeGame) {
            if (rawStatus === "active") {
                return false;
            }
            else {
                return true;
            }

        }
        else {
            return false;
        }
    }

    const handleCheckboxChange = (gameId) => {
        setGameAcceptableList(prevState =>
            prevState.map(game => {
                if (game.gameId === gameId && game.rawStatus === "active") {
                    const newState = { ...game, rawStatus: "private" };
                    return newState;
                }
                else if (game.gameId === gameId && game.rawStatus !== "active") {
                    const newState = { ...game, rawStatus: "active" };
                    return newState;
                }
                return game;
            })
        );
    }

    const handleCancel = () => {
        document.getElementById('modal_import_game_list').close();
    }

    const handleSave = () => {
        console.log(updateGameList);
        insertDataWithParams("/mysql/update-game-profile", updateGameList)
            .then(result => {
                fetchData("/mysql/get-all-game-profile")
                    .then(res => {
                        setGameCreatedList(res);
                        findCurrentGamePick(res);
                        document.getElementById('modal_import_game_list').close();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error)
                document.getElementById('modal_import_game_list').close();
            })
    }

    return (
        <>
            {<dialog id="modal_import_game_list" className={`modal`}>
                <div className="modal-box max-w-4xl overflow-hidden bg-slate-50">
                    <form method="dialog" className="absolute right-2 top-2">
                        <button className="text-sm text-slate-400 h-fit hover:bg-slate-100 p-2 rounded-full"
                        >
                            <ImCross className="" />
                        </button>
                    </form>
                    <h3 className="font-semibold text-xl">เกมที่สร้างไว้</h3>

                    {gameAcceptableList.length > 0 &&
                        <div className="mt-4">
                            <div className="flex justify-between my-auto">
                                <p className="text-sm mb-0.5 text-slate-500">{gameAcceptableList.length} รายการ</p>
                                <p className="text-xs my-auto text-slate-500 mr-0.5">{currentPage + 1} / {totalPages}</p>
                            </div>
                            <div className="overflow-x-auto bg-white rounded-lg drop-shadow-sm mt-1">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="border-b border-b-slate-200">
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox rounded-[4px]" />
                                                </label>
                                            </th>
                                            <th className="text-slate-600 text-sm font-normal">ลำดับ</th>
                                            <th className="text-slate-600 text-sm font-normal">ชื่อเกม</th>
                                            <th className="text-slate-600 text-sm font-normal">รูปแบบ</th>
                                            <th className="text-slate-600 text-sm font-normal">สถานะ</th>
                                            <th className="text-slate-600 text-sm font-normal">แก้ไขล่าสุด</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Map over products to generate table rows */}
                                        {gameAcceptableList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((game, index) => (
                                            <tr key={game.gameId}>
                                                <td>
                                                    <label>
                                                        <input type="checkbox" className="checkbox rounded-[4px] [--chkbg:theme(colors.green.600)]
                                                     [--chkfg:white] checked:border-slate-400"
                                                            checked={game.rawStatus === "active" ? true : false}
                                                            onChange={() => handleCheckboxChange(game.gameId, game.rawStatus)}
                                                            disabled={isCheckboxDisable(game.rawStatus)}
                                                        />

                                                    </label>
                                                </td>
                                                <td className="text-xs">{index + currentPage * itemsPerPage + 1}.</td>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="">
                                                            <div className="w-12 h-12">
                                                                <img src={game.imageSrc} alt={game.title}
                                                                    className="rounded-md border border-slate-200" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-blue-600 hover:underline cursor-pointer">{game.title}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-slate-500 text-xs">{game.typeDetail}</td>
                                                <td className="text-slate-500 text-xs">{game.status}</td>
                                                <td className="text-slate-500 text-xs">{game.lastEdited}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex text-xs justify-center gap-x-1 mt-4">
                                <button disabled={currentPage === 0}
                                    className={`text-green-600 hover:underline cursor-pointer my-auto disabled:text-slate-300`}
                                    onClick={handlePrevPage}>
                                    <FaChevronLeft />
                                </button>
                                <p className="border-x px-2 my-auto">{currentPage + 1}</p>
                                <button disabled={currentPage === totalPages - 1}
                                    className={`text-green-600 hover:underline cursor-pointer my-auto disabled:text-slate-300`}
                                    onClick={handleNextPage}>
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>}

                    <div className="flex gap-x-1 mt-2">
                        <button className="text-blue-600 hover:bg-blue-100 border-blue-600 border px-2 py-1 rounded-md"
                            onClick={handleSave}>
                            บันทึกการเปลี่ยนแปลง
                        </button>
                        <button className="text-slate-400 hover:bg-slate-100 border-slate-400 border px-2 py-1 rounded-md"
                            onClick={handleCancel}>
                            ยกเลิก
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>}
        </>
    )
}

export default ModalGameCreatedList