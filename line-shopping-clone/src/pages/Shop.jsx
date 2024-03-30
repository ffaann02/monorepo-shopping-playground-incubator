import Live from "../components/shopPage/Live"
import Product from "../components/shopPage/Product"
import ShopInfo from "../components/shopPage/ShopInfo"

const Shop = () => {
  return (
    <div className="w-full pt-16 bg-[#f8f8f8]">
        <ShopInfo/>
        <Live/>
        <Product/>
    </div>
  )
}
export default Shop