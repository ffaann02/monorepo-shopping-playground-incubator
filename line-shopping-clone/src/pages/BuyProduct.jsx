import ShoppingEx from "../components/MyPage/ShoppingEx";
import ProductCarousel from "../components/BuyProduct/ProductCarousel";
import BuyProductBar from "../components/BuyProduct/BuyProductBar";
import ProductShop from "../components/BuyProduct/ProductShop";

const BuyProduct = () => {
    return (
        <div >
            <ShoppingEx />
            <div className="">
                <ProductCarousel />
                <ProductShop/>
            </div>
            <BuyProductBar/>
        </div>
    )
}
export default BuyProduct;