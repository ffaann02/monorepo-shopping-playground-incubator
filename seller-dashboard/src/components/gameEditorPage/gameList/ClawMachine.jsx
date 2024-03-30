import { useState } from "react";
import SelectTools from "../gameEditorLayout/shared/SelectTools";
import WorkSpace from "../gameEditorLayout/others/memoryCard/WorkSpace";
import Workspace from "../gameEditorLayout/others/clawMachine/Workspace";
import SettingTools from "../gameEditorLayout/others/clawMachine/SettingTools";

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
]

const ClawMachine = ({ gameId }) => {
  const [currentTool, setCurrentTool] = useState(0);
  return (
    <>
      <div className="px-16">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-semibold">เกมตู้คีบของรางวัล</p>
            <p className="text-md font-thin font-sans flex">
              ตั้งค่าและจัดการเกมบนหน้าร้านคุณใน
              <p className="ml-1 font-normal">LINE SHOPPING</p>
            </p>
          </div>
          <div className="my-auto">
            <button className="p-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md"
              onClick={() => { }}>
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </div>
        <div className="w-full mt-4 grid grid-cols-12 gap-x-4 gap-y-3">
          <SelectTools
            toolList={toolList}
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
          />
          <Workspace/>
          <SettingTools/>
        </div>
      </div>
    </>

  )
}
export default ClawMachine