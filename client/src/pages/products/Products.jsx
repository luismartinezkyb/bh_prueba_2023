import { useEffect, useState } from "react"
import { getProducts,  } from "../../api/productsApi"
import { generateError, generateSuccess } from '../../components/errors/alert'
import Product from "./Product";
import Loader from "../../components/partials/Loader";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const allProducts = ()=>{
    getProducts()
    .then(res =>{
      setLoader(false)
      setProducts(res.data)
    })
    .catch(err =>{
      console.log(err)
      generateError('Something went wrong with the api')
    })
  }
  useEffect(() =>{
    allProducts();
  },[])

  if(loader){
    return <Loader/>
  }

  return (
    
    <div className="m-4">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            products.map(product=>{
              
              return (
                <Product key={product.product_id} product={product}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

