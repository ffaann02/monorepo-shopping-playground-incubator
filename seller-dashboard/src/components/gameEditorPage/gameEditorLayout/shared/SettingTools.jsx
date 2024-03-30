import WheelSpinnerGameSetup from "../others/wheelSpinner/GameSetup"
import { useLocation } from "react-router-dom";


const toolsMap = {
    "ws": WheelSpinnerGameSetup,
};

const SettingTools = ({
    gameId,
    toolList,
    currentTool,
    setCurrentTool,
    giftType,
    setGiftType,
    giftList,
    setGiftList,
    limitTicket,
    setLimitTicket,
    wheelProps,
    onUpdateProps,
    setImportingGiftList
}) => {
    const location = useLocation();
    const path = location.pathname;
    const segments = path.split("/");

    const lastSegment = segments[segments.length - 1];
    
    // Find the corresponding component based on the last segment
    const Component = Object.keys(toolsMap).find(key => lastSegment.includes(key));
    const Tool = toolsMap[Component];
    
    return (
        <div className="bg-white 2xl:col-span-4 xl:col-span-5 rounded-md drop-shadow-sm pl-4 pr-3 py-2">
            <div className="py-1 flex items-center px-1">
                
                <hr className="flex-grow border-slate-300 border-t" />
                <p className="px-3 flex-shrink-0">{toolList[currentTool].title}</p>
                <hr className="flex-grow border-slate-300 border-t" />
            </div>
            <div className="" id="setting_container">
                {Component && (
                    <Tool
                        gameId={gameId}
                        toolList={toolList}
                        currentTool={currentTool}
                        setCurrentTool={setCurrentTool}
                        giftType={giftType}
                        setGiftType={setGiftType}
                        giftList={giftList}
                        setGiftList={setGiftList}
                        limitTicket={limitTicket}
                        setLimitTicket={setLimitTicket}
                        wheelProps={wheelProps}
                        onUpdateProps={onUpdateProps}
                        setImportingGiftList={setImportingGiftList}
                    />
                )}
            </div>
        </div>
    );
};

export default SettingTools;
