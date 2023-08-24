import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormProduct from '../../components/FormProduct'
import { createProduct, getCategories, getProduct, updateProduct } from '../../api/productsApi'
import { generateError, generateSuccess } from '../../components/errors/alert'

import Loader from '../../components/partials/Loader'


export default function EditProduct() {
  const navigate = useNavigate()
  const {product_id}= useParams();
  const [image, setImage] = useState('')
  const [loader, setLoader]= useState(true);
  const [loading, setLoading] = useState(false)
  const [product, setProduct]=useState({});
  const [categories, setCategories] = useState([]);


  const oneProduct = (product_id)=>{
    getProduct(product_id)
    .then(res=>{
      console.log(res.data)
      setProduct(res.data)
    })
    .catch(err=>{
      console.log('ERROR', err)
      generateError('Something went wrong getting the product')
    })
  }
  const allCategories = ()=>{
      getCategories()
      .then(res =>{
          setCategories(res.data)
          setLoader(false)
      })
      .catch(err =>{
          console.log(err)
          generateError('Something went wrong with the api')
      })
  }
  const handleImage=(e)=>{
      // console.log("HEEEY",e.target.files[0])
      setImage(e.target.files[0]);
  }

    const onSubmit=(data)=>{
        setLoader(true)
        console.log("DATA",data)
        const formData = new FormData();
        
        for (const key in data) {
            formData.append(key, data[key]);
        }
        // console.log(formData)
        
        
        updateProduct(formData, data.product_id)
        .then(res=>{
            console.log(res)
            if(res.status ===200 )
                generateSuccess('Product updated successfully')

            setTimeout(()=>navigate('/products'),2000)
            setLoading(false)
        })
        .catch(err =>{
            console.log(err)
            generateError('Something went wrong with the api')
            setLoading(false)
        })
        setLoading(false)
    }

    useEffect(()=>{
        oneProduct(product_id);
        allCategories();
    },[])

    if(loader) return <Loader></Loader>
    return (
        
        <FormProduct loading={loading} type='Editar' product={product} onSubmit={onSubmit} categories={categories} handleImage={handleImage}/>
    )
}
