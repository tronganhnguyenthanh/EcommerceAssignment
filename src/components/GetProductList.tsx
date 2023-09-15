import {useEffect, useState} from "react"
import productListTypes from "../types/product.list.types"
import "../css/product.css"
import InfiniteScroll from "react-infinite-scroll-component"
import loadingApi from "../images/loading.gif"
const GetProductList = () => {
  const [productList, setProductList] = useState<productListTypes | undefined>()
  const [keyword, setKeyword] = useState("")
  const [hasMore, setHasMore] = useState(false)
  const handleOnFilterProduct = async (e: any) => {
    e.target.value = e.target.value.trim();
    setKeyword(e.target.value)
    let filterProductApi = `https://dummyjson.com/products/search?q=${keyword}`
    let filterProduct = await fetch(filterProductApi)
    let searchableProduct = await filterProduct?.json()
    setProductList(searchableProduct)
  }
  useEffect(() => {
   getProductList()
  }, [])
  const getProductList = async () => {
    let productApi = "https://dummyjson.com/products"
    let productList = await fetch(productApi)
    let response = await productList.json()
    setProductList(response)
    setHasMore(!hasMore)
  }
  const styles = {
    display:"flex",
    justifyContent:"center"
  }
  return (
    <div className="container">
      <h1 className="text-3xl text-center text-blue-500">Get product list</h1>
      <form method="POST">
        <input
          type="text"
          className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-9/12 ml-4 rounded-md sm:text-sm focus:ring-1"
          style={{margin:"auto", borderRadius:"30px"}}
          onChange={handleOnFilterProduct}
        />
      </form>
      <InfiniteScroll 
         dataLength={Number(productList?.products?.length)}
         next={getProductList}
         hasMore={!hasMore}
         loader={
          <div style={styles} className="py-48">
            <img src={loadingApi} alt="" className="w-12"/>
          </div>
        }
       >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 p-2">
          {productList?.products?.map((i, index) => {
            return (
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={index}>
                <div className="md:flex p-2">
                  <img src={String(i?.thumbnail)} alt="" className="image-product-custom" />
                </div>
                <div className="p-8">
                  <h1 className="text-center text-2xl text-blue-500">{i?.title}</h1>
                  <p className="text-center text-orange-300">{"$" + Number(i?.price)}</p>
                </div>
              </div>
            )
          })
          }
        </div>
      </InfiniteScroll>
    </div>
  )
}
export default GetProductList