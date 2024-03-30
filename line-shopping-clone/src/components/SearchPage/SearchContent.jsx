import TopShop from "./TopShop";
const SearchContent = () =>{
    return(
        <div className="px-4 pt-28 bg-white">
            <div className="">
                <h1 className="font-bold">10 ร้านค้าที่ถูกค้นหามากที่สุด</h1>
                <TopShop/>
            </div>
        </div>
    )
}
export default SearchContent;