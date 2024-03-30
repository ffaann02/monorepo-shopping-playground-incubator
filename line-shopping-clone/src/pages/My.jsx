import MyNav from "../components/MyPage/MyNav";
import Header from "../components/MyPage/Header"
import ViewItems from "../components/MyPage/ViewItems";
import ShoppingEx from "../components/MyPage/ShoppingEx";
const My = () => {
    return (
        <div className="bg-white h-full overflow-y-auto">
            <MyNav />
            <ShoppingEx/>
            <div className="">
                <Header />
                <ViewItems />
            </div>
        </div>
    )
}

export default My;