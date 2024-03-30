import { CiGift } from "react-icons/ci";

const BuyProductBar = () => {
    return(
        <div className="fixed bottom-0 bg-white w-full border-t-2 border-opacity-10 border-gray-500">
            <div className="flex justify-between items-center mx-4 mb-2 pt-2">
                <CiGift className=" text-2xl mb-2 ms-3"/>
                <div className="flex gap-x-2 mb-2">
                    <div className="flex bg-[#3f3f3f] text-white font-bold w-[147px] h-[48px] rounded-md items-center justify-center">
                        <div className="">
                            Buy Now
                        </div>
                    </div>
                    <div className="flex bg-gradient-to-r from-[#1dd053] to-[#00c1af] w-[147px] h-[48px] rounded-md items-center justify-center">
                        <div className="text-white font-bold">
                            Add to cart
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default BuyProductBar;