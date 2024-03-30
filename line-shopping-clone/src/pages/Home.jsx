import BannerCarousel from "../components/HomePage/BannerCarousel";
import CateCarousel from "../components/HomePage/CategoryCarousel";
import BirthNotice from "../components/HomePage/BirthNotice";
import GiftZone from "../components/HomePage/GiftZone";
import HotProduct from "../components/HomePage/HotProduct";
import Live from "../components/HomePage/Event/Live";
import WowItems from "../components/HomePage/Event/WowItems";
import DealMonthly from "../components/HomePage/Event/DealMonthly";
const Home = () => {
    return (
        <div className="mt-2 pb-20 bg-white overflow-y-auto">
                <BannerCarousel />
                <CateCarousel />
                <BirthNotice />
                <GiftZone />
                <Live />
                <WowItems/>
                <DealMonthly/>
                <HotProduct/>
        </div>
    )
}
export default Home;