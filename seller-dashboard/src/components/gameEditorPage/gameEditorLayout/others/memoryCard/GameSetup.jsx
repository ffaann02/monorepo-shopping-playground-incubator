import ConditionMemory from "./ConditionMemory"
import Decoration from "./Decoration"
import GiftListMemory from "./GiftListMemory"
import Setting from "./Setting"

const GameSetup = ({ toolList, currentTool, setCurrentTool,gameId }) => {
    return (
        <div className={`bg-white 2xl:col-span-4 xl:col-span-5 rounded-lg drop-shadow-sm pl-4 pr-3 py-2`}>
            <div className="py-1 flex items-center px-1">
                <hr className="flex-grow border-slate-300 border-t" />
                <p className="px-3 flex-shrink-0">{toolList[currentTool].title}</p>
                <hr className="flex-grow border-slate-300 border-t" />
            </div>
            {toolList[currentTool].title === "ลิสต์ของรางวัล" && (
                <>
                    <GiftListMemory gameId={gameId}/>
                </>
            )}

            {toolList[currentTool].title === "ตั้งค่าเกม" && (
                <>
                    <Setting gameId={gameId}/>
                </>
            )}

            {toolList[currentTool].title === "เงื่อนไขรับสิทธิ" && (
                <>
                    <ConditionMemory/>
                </>
            )}
            {toolList[currentTool].title === "ตกแต่งเกม" && (
                <>
                    <Decoration gameId={gameId}/>
                </>
            )}
        </div>
    )
}
export default GameSetup