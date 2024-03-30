const CraneMachineModal = () => {
    return (
        <div>
            <button className="btn mt-2 bg-green-400 text-white" onClick={() => document.getElementById('CraneMachineModal').showModal()}>สร้างเกม</button>

            <dialog id="CraneMachineModal" className="modal">
                <div className="modal-box sm:max-w-5xl md:max-h-96 mx-auto ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex col-span-1 justify-center items-center">
                            <img className="h-80 w-80"
                                src="https://i.ibb.co/bHpZ5BX/Clae-Machine-Fixed.png" />
                        </div>
                        <div className="flex flex-col col-span-1 justify-center items-start">
                            <p className="py-4 text-start text-4xl font-bold">สร้างเกมตู้คีบ</p>
                            <p className="font-semibold text-xl">ชื่อของตู้คีบ</p>
                            <input type="text" className=" border-b pr-32 px-2 text-xl" placeholder="ใส่ชื่อของตู้คีบ"></input>
                            <p className="font-semibold mt-8 text-xl">วันที่</p>
                            <input type="text" className=" border-b pr-32 px-2 text-xl" readOnly value="12-12-2024"></input>

                            <div className="flex justify-end gap-2 mt-12 w-full pr-8">
                                <button className="btn bg-green-400 text-white text-lg">สร้างเกม</button>
                                <form method="dialog">
                                    <button className="btn bg-[#555555] text-white text-lg">ปิด</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </dialog>

        </div>
    )
}

export default CraneMachineModal;