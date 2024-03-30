import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { openNewTab } from "../utils/external";

const fakeList = [
    { name: "Faan", email: "rudfaanmaimahad@gmail.com", role: "Owner" },
    // { name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    // { name: "Mike Johnson", email: "mike@example.com", role: "Manager" }
];

const Setting = () => {
    const initialApiKeys = [
        {
            title: 'OAPlus API',
            value: 'https://api.myshop.com/webhook1'
        },
        {
            title: 'Webhook',
            value: 'https://api.myshop.com/webhook2'
        },
        // {
        //     title: 'Webhook URL 3',
        //     value: 'https://api.myshop.com/webhook3'
        // }
    ];

    const [apiKeys, setApiKeys] = useState(initialApiKeys);
    const [editIndex, setEditIndex] = useState(null);
    const [editedValue, setEditedValue] = useState(""); // State to track edited value

    const toggleEdit = (index) => {
        setEditIndex((prevIndex) => (prevIndex === index ? null : index));
        if (editIndex === index) {
            // Reset edited value when toggling edit off
            setEditedValue(""); // Reset edited value to empty when exiting edit mode
        } else {
            // Set edited value to the value from apiKeys when entering edit mode
            setEditedValue(apiKeys[index].value);
        }
    };

    const handleInputChange = (event) => {
        setEditedValue(event.target.value);
    };

    const cancelEdit = () => {
        // Reset edited value back to original value
        setEditedValue(apiKeys[editIndex].value);
        toggleEdit(editIndex);
    };

    const saveEdit = () => {
        const updatedApiKeys = [...apiKeys];
        updatedApiKeys[editIndex].value = editedValue;
        setApiKeys(updatedApiKeys);
        toggleEdit(editIndex);
    };

    return (
        <div className="pt-12 px-24 w-full">
            <div>
                <p className="text-2xl font-semibold">ตั้งค่า</p>
                <p className="text-md font-sans font-thin flex">ตั้งค่าร้านค้าของคุณให้ตรงกับความต้องการของคุณ</p>
            </div>
            <div className="card-container">
                <div className="w-full grid grid-cols-12 mt-6 gap-x-4">
                    <div className="col-span-9 bg-white rounded-md drop-shadow-xs px-5 pt-4 pb-2 text-slate-800">
                        <div className="border-b pb-2 flex">
                            <p className="font-semibold text-lg">เชื่อมต่อกับ MyShop ด้วย API Keys</p>
                            <p className="cursor-pointer hover:underline text-xs text-blue-600 mt-2 ml-2" onClick={() => { openNewTab("https://oaplus.line.biz/") }}>เข้าถึง API Key ที่ MyShop</p>
                        </div>
                        <div className="w-full mt-3" id="apiKeyContainer">
                            {apiKeys.map((apiKey, index) => (
                                <div key={index} className="py-2 grid grid-cols-12">
                                    <p className="text-sm my-auto col-span-1 mt-0">{apiKey.title}</p>
                                    <div className={`${editIndex === index ? "col-span-11" : "col-span-10"} flex-grow rounded-[0.2rem] ml-2 ${editIndex === index ? "mr-0" : "mr-2"} flex`}>
                                        <div className="w-full my-auto flex flex-col">
                                            {editIndex === index ? (
                                                <input type="text" className="w-full h-8 pl-2 text-sm rounded-[0.2rem] shadow-sm shadow-slate-200 text-neutral-600 bg-slate-100 border border-slate-300"
                                                    value={editedValue} onChange={handleInputChange} />
                                            ) : (
                                                <div className="bg-slate-50 text-sm text-neutral-500 my-auto pl-2 h-8 flex">
                                                    <p className="my-auto">{apiKey.value}</p>
                                                </div>
                                            )}
                                            {editIndex === index && (
                                                <div className="flex gap-x-2 mt-2" id="edit_button">
                                                    <button className="text-sm text-center w-fit px-2 py-1 rounded-[0.2rem] bg-green-500 hover:bg-green-600 text-white font-semibold" onClick={saveEdit}>
                                                        บันทึก
                                                    </button>
                                                    <button onClick={cancelEdit} className="text-sm text-center w-fit px-2 py-1 rounded-[0.2rem] bg-neutral-200 hover:bg-neutral-300 font-semibold text-neutral-500">
                                                        ยกเลิก
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {editIndex !== index && <div className="col-span-1 flex mt-0 mb-auto">
                                        <button onClick={() => toggleEdit(index)} className="text-sm text-center w-full h-8 rounded-sm border border-slate-200 hover:bg-slate-100">
                                            แก้ไข
                                        </button>
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-container">
                <div className="w-full grid grid-cols-12 mt-6 gap-x-4">
                    <div className="col-span-9 bg-white rounded-md drop-shadow-xs px-5 pt-4 pb-2 text-slate-800">
                        <div className="border-b pb-2 flex">
                            <p className="font-semibold text-lg">จัดการสมาชิก และหน้าที่</p>
                            {/* <p className="cursor-pointer hover:underline text-xs text-blue-600 mt-2 ml-2" onClick={() => { openNewTab("https://oaplus.line.biz/") }}>เข้าถึง API Key ที่ MyShop</p> */}
                        </div>
                        <div className="w-full mt-3" id="apiKeyContainer">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            {/* <th></th> */}
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Generate table rows */}
                                        {fakeList.map((item, index) => (
                                            <tr key={index}>
                                                {/* <th>{index + 1}</th> */}
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    <button onClick={() => toggleEdit(index)}
                                                        className="text-md rounded-sm text-center w-full h-8 border border-slate-200 hover:bg-slate-100">
                                                        แก้ไข
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting;
