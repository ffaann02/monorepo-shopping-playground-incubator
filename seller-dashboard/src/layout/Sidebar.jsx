import { LuHome } from "react-icons/lu";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdOutlineSell, MdOutlineCampaign } from "react-icons/md";
import { PiHandTap } from "react-icons/pi";
import { useState } from "react";
import { TbUserDollar } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
const SideBarObject = [
  {
    id: 1,
    title: "ภาพรวม",
    url: "/overview",
    icon: <LuHome className="mt-1 text-xl" />,
    sublist: [
      {
        id: 1,
        title: "เริ่มต้นใช้งาน",
        url: "/getting-started"
      },
      {
        id: 2,
        title: "แดชบอร์ด",
        url: "/dashboard"
      },
      {
        id: 3,
        title: "วิธีการใช้งาน",
        url: "/documentation"
      }
    ]
  },
  {
    id: 2,
    title: "รางวัล",
    url: "/reward",
    icon: <MdOutlineSell className="mt-1 text-xl" />,
    sublist: [
      {
        id: 1,
        title: "รายการของแถม",
        url: "/gift"
      },
      {
        id: 1,
        title: "รายการคูปอง",
        url: "/coupon"
      },
      {
        id: 2,
        title: "ประวัติรางวัล",
        url: "/history"
      },
    ]
  },
  {
    id: 3,
    title: "จัดการกิจกรรม",
    url: "/activities",
    icon: <MdOutlineCampaign className="mt-1 text-xl" />,
    sublist: [
      {
        id: 1,
        title: "เกมประจำร้าน",
        url: "/select-game"
      },
      {
        id: 2,
        title: "เกม LIVE",
        url: "/game-live"
      },
      {
        id: 3,
        title: "",
        url: "/"
      },
    ]
  },
  {
    id: 4,
    title: "การมีส่วนร่วม",
    url: "/engagement",
    icon: <PiHandTap className="mt-1 text-xl" />,
    sublist: [
      {
        id: 1,
        title: "ติดตามการมีส่วนร่วม",
        url: "/"
      },
      {
        id: 2,
        title: "รีวิวสินค้า",
        url: "/"
      },
    ]
  },
  {
    id: 5,
    title: "วิเคราะห์การขาย",
    url: "/analysis",
    icon: <VscGraphLine className="mt-1 text-xl" />,
    sublist: [
      {
        id: 1,
        title: "ยอดขาย",
        url: "/"
      },
      {
        id: 2,
        title: "ข้อมูล และความสัมพันธ์",
        url: "/"
      },
    ]
  },
  {
    id: 6,
    title: "ความช่วยเหลือ",
    url: "/customer",
    icon: <TbUserDollar className="mt-1 text-xl" />,
    sublist: [
      {
        id: 1,
        title: "ติดต่อทีมงาน",
        url: "/"
      },
      {
        id: 2,
        title: "คำร้องขอ",
        url: "/"
      },
    ]
  },
]



const Sidebar = () => {
  const [section, setSection] = useState(0);
  return (
    <div className="col-span-2 h-full font-IBMth drop-shadow-md bg-white">
      <div className="w-full sticky top-20 flex flex-col mt-20 z-[5]">
        <p className="text-xl font-semibold px-4 py-3 text-center text-slate-600">จัดการร้านค้า</p>
        {SideBarObject.map((menu, index) => (
          <div className="bg-white hover:bg-slate-100" key={'menu-'+index}>
            <div className={`w-full px-6 py-4 flex  text-slate-600 cursor-pointer justify-between`}
              onClick={() => {
                setSection(prev => {
                  prev === index ? setSection(-1) : setSection(index);
                })
              }}>
              <div className="flex">
                <>{menu.icon}</>
                <p className="ml-3 mt-1 pr-10">{menu.title}</p>
              </div>
              {section === index ? <IoIosArrowUp className="my-auto text-xl" /> : <IoIosArrowDown className="my-auto text-xl" />}
            </div>
            {section === index &&
              <ul className="pl-[3.5rem] text-sm pb-4">
                {menu.sublist.map((list,index) => (
                  <Link to={menu.url + list.url} key={index}>
                    <p className="py-1 cursor-pointer hover:text-green-600 pr-6" key={"list-"+index}>{list.title}</p>
                  </Link>
                ))}
              </ul>}
          </div>
        ))}
        <Link to="/setting">
          <div className="bg-white hover:bg-slate-100">
            <div className={`w-full px-6 py-4 flex  text-slate-600 cursor-pointer justify-between`}>
              <div className="flex">
                <IoSettingsOutline className="my-auto" />
                <p className="ml-3 mt-1 pr-10 hover:text-green-600">ตั้งค่า</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Sidebar