import { useEffect, useState } from "react"
import { LuEdit } from "react-icons/lu";
import { getProduct } from "../../api/productsApi"
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom"
import { generateError } from "../../components/errors/alert";
import Loader from "../../components/partials/Loader";
import { AiOutlineArrowLeft } from "react-icons/ai";


export default function ProductDetail() {
  const VITE_URL_API = import.meta.env.VITE_URL_API;
  const {product_id}= useParams();
  const navigate = useNavigate();
  
  
  
  // "in_stock": false,
  // "discount": "99.00",
  // "created_at": "2023-08-21T00:42:47.000Z",
  // "updated_at": "2023-08-22T04:03:01.000Z",
  
  const [product, setProduct] = useState({})
  const [loader, setLoader] = useState(true)
  

  const oneProduct = (product_id)=>{
    getProduct(product_id)
    .then((res)=>{
      console.log(res.data)
      setProduct(res.data)
      setLoader(false);
    }).catch((err)=>{
        console.log('ERROR on getProduct', err);
        generateError('Something went wrong with the request')
    })
  }
  useEffect(()=>{
      oneProduct(product_id);
  },[product_id])


  const onCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };


  if(loader) return <Loader></Loader>
  return (
    <>
    <div className="px-8 py-4 flex flex-row gap-4 ">
            <AiOutlineArrowLeft
              onClick={onCancel}
              className="hover:text-blue-800 hover:cursor-pointer w-[22px] h-[22px]"
            ></AiOutlineArrowLeft>
            <h1
              onClick={onCancel}
              className="hover:text-blue-800 hover:cursor-pointer"
            >
          Back
        </h1>
      </div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="flex items-center justify-center w-full lg:w-1/2">
            <img alt={product.name} className="w-[300px] lg:w-full object-cover object-center rounded border border-gray-200" src={`${VITE_URL_API}/${product.image}`}/>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category.name}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">{product.name}</h1>
              
              <p className="leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                {
                  product.discount!==0 &&
                  <span className="title-font font-sm text-2xl text-gray-400 mx-2">-{product.discount}%</span>
                }
                <Link to={`/products/${product.product_id}/edit`} className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                  <div className="flex justify-center items-center flex-row gap-2">
                    <LuEdit className="h-4 w-4" />
                    <p>Edit</p>

                  </div>
                  </Link>
                
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 ">
                  
                  <svg fill="currentColor"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" color={`${product.in_stock?'green':'red'}`} className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
