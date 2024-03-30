import { Chart } from "react-google-charts";

export const data = [
    ["จำนวนครั้งในการเล่น (ครั้ง)", "< 3 ครั้ง", "3 - 10 ครั้ง", "> 10 ครั้ง"],
    ["จากไลฟ์", 84, 40, 20],
    ["จากห้องแชท", 64, 46, 25],
    ["จากแพลตฟอร์มอื่น ๆ", 66, 11, 30],
];

export const options = {
    chart: {
    },
};

const PlayerLIVE = ({ realTimeData, formatTimestamp, logMessage }) => {
    return (
        <div className="w-full h-full pt-8 grid grid-cols-12 gap-4">
            <div className="w-full pt-3 pb-4 px-4 bg-white rounded-md col-span-7 flex flex-col gap-y-2">
                <div className="h-full">
                    <h2 className="text-xl font-semibold text-slate-600 mb-6">อัตราการคะแนนในไลฟ์</h2>
                    <div className="overflow-x-auto">
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="300px"
                            data={data}
                            options={options}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full pt-3 pb-4 px-4 bg-white rounded-md col-span-5 flex flex-col gap-y-2">
                <div className="h-full">
                    <h2 className="text-xl font-semibold text-slate-600">ข้อมูลการใช้งาน (Log)</h2>
                    <div className="mt-2 flex flex-col gap-y-2">
                        {/* {logMessage.map((log, index) => (
                            <div className="flex justify-between w-full text-sm">
                                <p>{log.timestamp}</p>
                                <p>{log.message}</p>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
            <div className="w-full pt-3 pb-4 px-4 bg-white rounded-md col-span-12 flex flex-col gap-y-2">
                <div className="h-full">
                    <h2 className="text-xl font-semibold text-slate-600">ลูกค้าอันดับสูงสุด</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>คะแนน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {realTimeData.room.map((user, index) => (
                                    <tr key={index}>
                                        <th>1</th>
                                        <td>
                                            <div className="flex">
                                                <img src={user.image} className="w-10 h-10 p-0.5 rounded-md border border-slate-300" />
                                                <p className="my-auto ml-2">{user.name}</p>
                                            </div>
                                        </td>
                                        <td>{formatTimestamp(user.best_play_time)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PlayerLIVE