import { IoIosArrowForward } from "react-icons/io";

const BirthNotice = () => {
    return (
        <div className="mt-2">
            <div className="px-4 justify-center">
                <div className="flex border rounded-lg border-2 border-cyan-100 bg-cyan-50 px-4 py-3 justify-between items-center">
                    <div className="">
                        <div className="text-base font-bold">
                            ใกล้ถึงวันเกิดเพื่อนแล้ว!
                        </div>
                        <div className="flex flex-row items-center font-extralight text-[12px] text-gray-500">
                            <div>ดูวันเกิดเพื่อน</div>
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="relative">
                        <img src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-confetti.svg" />
                        <div >
                            <img 
                            className="absolute rounded-full items-center h-10 w-10 max-w-none inset-0 top-3 left-6"
                            src="https://profile.line-scdn.net/0hbaOC4eOsPU5yOi7jYSRCGU5_MyMFFDsGClV6KV9tMHheWnMeGVxyL1NpZilYAy4YSlsiKlNpYitf"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BirthNotice;