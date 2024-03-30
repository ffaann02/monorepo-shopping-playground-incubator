import ExploreNav from "../components/ExplorePage/ExploreNav";
import ExploreContent from "../components/ExplorePage/ExploreContent";

const Explore = () => {
    return (
        <div className="bg-white h-full overflow-y-auto">
            <ExploreNav />
            <ExploreContent />
            <div className="flex justify-center text-center mb-24">
                <div className=" text-gray-600 text-[11px] gap-x-4 mb-4">
                    <button className=""> ข้อตกลงการใช้งาน </button>
                    <div className="inline-block border-1 border-gray-32 h-9 w-1 mx-3"/>
                    <button className=""> นโยบายความเป็นส่วนตัว </button>
                </div>
            </div>
        </div>
    )
}
export default Explore;