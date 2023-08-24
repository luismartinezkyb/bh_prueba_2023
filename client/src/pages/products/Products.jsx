import { useEffect, useState } from "react"
import { deleteProduct, getProducts,  } from "../../api/productsApi"
import { generateError, generateSuccess } from '../../components/errors/alert'

import ProductCard from "./ProductCard";
import Loader from "../../components/partials/Loader";
import Modal from "../../components/Modal";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [toggle,setToggle] = useState(false);
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


  const handleDelete = (product_id)=>{
      setLoader(true)
      deleteProduct(product_id)
      .then(res=>{
        
        generateSuccess(`Product deleted successfully`);
        setProducts(products.filter(p=>p.product_id!==product_id));
        setLoader(false);
      })
      .catch(err =>{
        console.log(err)
        
        generateError('Something went wrong with the api delete')
        setLoader(false)
      })


  }

  if(loader){
    return <Loader/>
  }

  return (
    
    <div className="m-4">
      <div className="flex justify-center items-center">
        <Link to={`/products/create`}>
          <Button className="flex items-center w-50" color="blue" size="sm">
            Add new Product
          </Button>
        </Link>
        
      </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            products.map(product=>{
              
              return (
                <ProductCard key={product.product_id} product={product} handleDelete={handleDelete}/>
              )
            })
          }
        </div>
      </div>
      
      
      <Modal toggle={toggle} setToggle={setToggle}></Modal>
    </div>
  )
}

