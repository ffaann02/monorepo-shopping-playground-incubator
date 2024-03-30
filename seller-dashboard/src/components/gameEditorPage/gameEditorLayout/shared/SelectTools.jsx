

const SelectTools = ({ toolList, currentTool, setCurrentTool }) => {
    return (
        <div className='col-span-full rounded-md drop-shadow-sm h-fit mt-2'>
            <div id="tools_list" className="flex gap-x-2.5 text-lg border-b">
                {toolList.map((tool, index) => (
                    <div className={`-mb-0.5 px-2 py-1 ${currentTool===index ? "border-b-2 border-green-500":"border-b-2 border-transparent"} transition-all duration-200 ease-linear`}
                    key={index}>
                        <button className={`${currentTool === index ? "text-green-600" : "text-gray-400"}
                         hover:text-green-600`} onClick={()=>{setCurrentTool(index)}}>{tool.title}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SelectTools
