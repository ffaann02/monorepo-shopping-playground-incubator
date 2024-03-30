import { MdArrowForwardIos } from "react-icons/md";

const LiveData = [
    {
        img: "https://lss-glcms.line-scdn.net/0hEzBSa47OGlV_KgnqJgplAiN3BSwERw9fAVIHa0R4H2QXcjh7QjMsSBF4GCQSSjRkADcKT1J6GxVRYQJjSx4dWFpLIRIJSgJ8QzIwUxN5DwZSZihzHxwwMhw/f300x398",
        profile: "https://profile.line-scdn.net/0h-kcDUdcJckRePWZbn9ENE2J4fCkpE3QMJl44KihpKSZ6C2USalg0d3hoKnFwDTEbMFk8dy5ofHJ3",
        shopname: "Yanhee Exclusive",
        certified: 0,
        follower: "เพื่อน 3.2K",
        title: "3.3 ยันฮีไลฟ์ ช้อปสะบัดจัดแหลก",
        date: "2 มี.ค. 2567",
        time: "18:00"
    },
    {
        img: "https://lss-glcms.line-scdn.net/0hEzBSa47OGlV_KgnqJgplAiN3BSwERw9fAVIHa0R4H2QXcjh7QjMsSBF4GCQSSjRkADcKT1J6GxVRYQJjSx4dWFpLIRIJSgJ8QzIwUxN5DwZSZihzHxwwMhw/f300x398",
        profile: "https://profile.line-scdn.net/0h-kcDUdcJckRePWZbn9ENE2J4fCkpE3QMJl44KihpKSZ6C2USalg0d3hoKnFwDTEbMFk8dy5ofHJ3",
        shopname: "Yanhee Exclusive",
        certified: 1,
        follower: "เพื่อน 3.2K",
        title: "3.3 ยันฮีไลฟ์ ช้อปสะบัดจัดแหลก",
        date: "2 มี.ค. 2567",
        time: "18:00"
    },
    {
        img: "https://lss-glcms.line-scdn.net/0hEzBSa47OGlV_KgnqJgplAiN3BSwERw9fAVIHa0R4H2QXcjh7QjMsSBF4GCQSSjRkADcKT1J6GxVRYQJjSx4dWFpLIRIJSgJ8QzIwUxN5DwZSZihzHxwwMhw/f300x398",
        profile: "https://profile.line-scdn.net/0h-kcDUdcJckRePWZbn9ENE2J4fCkpE3QMJl44KihpKSZ6C2USalg0d3hoKnFwDTEbMFk8dy5ofHJ3",
        shopname: "Yanhee Exclusive",
        certified: 1,
        follower: "เพื่อน 3.2K",
        title: "3.3 ยันฮีไลฟ์ ช้อปสะบัดจัดแหลก",
        date: "2 มี.ค. 2567",
        time: "18:00"
    },
    {
        img: "https://lss-glcms.line-scdn.net/0hEzBSa47OGlV_KgnqJgplAiN3BSwERw9fAVIHa0R4H2QXcjh7QjMsSBF4GCQSSjRkADcKT1J6GxVRYQJjSx4dWFpLIRIJSgJ8QzIwUxN5DwZSZihzHxwwMhw/f300x398",
        profile: "https://profile.line-scdn.net/0h-kcDUdcJckRePWZbn9ENE2J4fCkpE3QMJl44KihpKSZ6C2USalg0d3hoKnFwDTEbMFk8dy5ofHJ3",
        shopname: "Yanhee Exclusive",
        certified: 0,
        follower: "เพื่อน 3.2K",
        title: "3.3 ยันฮีไลฟ์ ช้อปสะบัดจัดแหลก",
        date: "2 มี.ค. 2567",
        time: "18:00"
    },
]

const Live = () => {
    return (
        <div className="relative pt-6 pb-4 bg-gray-50 ">
            <div className="absolute w-full h-56 bottom-0 left bg-white z-0"></div>
            <div className="relative px-4 z-20">
                <div className="flex justify-between z-20">
                    <img src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/live-logo.svg" />
                    <div className="flex items-center gap-x-1 ">
                        <p className="text-xs font-light">ดูทั้งหมด</p>
                        <MdArrowForwardIos className="text-sm" />
                    </div>
                </div>
                <div className="carousel carousel-center gap-x-2">
                    {LiveData.map(item => (
                        <div className="carousel-item flex flex-col mt-4 w-40 ">
                            <div className="relative">
                                <img className=" w-40 h-full rounded-md border"
                                    src={item.img}
                                />
                                <div className="absolute top-2 left-2 bg-blue-400 px-1 rounded-md">
                                    <p className="text-white text-sm font-semibold">เร็วๆนี้</p>
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <div className="flex">
                                    <img
                                        className="w-7 h-7 mr-1 rounded-full"
                                        src={item.profile}
                                    />
                                    <div className="flex flex-col">
                                        <div key={item.certified} className="flex">
                                            <p className="text-xs text-gray-400 mr-1">{item.shopname}</p>
                                            {item.certified === 0 && (

                                                <img src="https://vos.line-scdn.net/line-shopping/lineshopping/ls/svg/icon-trust-badge.svg" />
                                            )}
                                        </div>
                                        <p className="text-[10px] text-gray-400">เพื่อน {item.follower}</p>
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <p className=" text-sm pr-4">{item.title}</p>
                                    <p className="text-xs text-gray-400">{item.date} • {item.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Live;