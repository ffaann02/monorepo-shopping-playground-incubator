const ExploreData = [
    {
        title: "💳 LINE Pay x LINE SHOPPING💚 ✨",
        desc: "💥 1 ก.พ. - 29 ก.พ. 67 นี้",
        src: "https://vos.line-scdn.net/ect-mall/upload/cbd32279-d531-4a1a-ab07-1e91950f2a64.png"
    },
    {
        title: "💥 SEASONAL SHOPPING 🛍",
        desc: "🌟 อัปเดตร้านค้าเเละไอเทมน่าช้อปในช่วงนี้!",
        src: "https://vos.line-scdn.net/ect-mall/upload/67fa0cbb-3205-461c-b5ba-2761e7fc29af.png"
    },
    {
        title: "LINE SHOPPING's Secret Coupon 🎟️💫",
        desc: "ชี้พิกัดร้านดัง แจกส่วนลดเพียบ ✨",
        src: "https://vos.line-scdn.net/ect-mall/upload/25c5a3ba-8e08-46da-9854-ce5ccc669c5c.png"
    },
    {
        title: "OMG! It's FREE SHIPPING🚛💜",
        desc: "มัดรวมไอเทมสุดชิคส่งฟรีทุกชิ้นไม่มีขั้นต่ำ!",
        src: "https://vos.line-scdn.net/ect-mall/upload/e9b0b3e3-8ae8-4311-8751-90d2871cd01b.png"
    }
]

const ExploreContent = () => {
    return (
        <div className="my-14 px-7">
            {ExploreData.map((items, index) => (
                <div className="my-10 ">
                    <div>
                        <p className="font-bold text-lg">{items.title}</p>
                        <p className="text-sm">{items.desc}</p>
                    </div>
                    <div className="mt-3">
                        <img src={items.src} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExploreContent;