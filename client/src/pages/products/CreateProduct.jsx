import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormProduct from '../../components/FormProduct'
import { createProduct, getCategories } from '../../api/productsApi'
import { generateError, generateSuccess } from '../../components/errors/alert'
import axios from 'axios'
import Loader from '../../components/partials/Loader'

export default function CreateProduct() {
    const navigate = useNavigate()
    const [image, setImage] = useState('')
    const [loader, setLoader]= useState(false);
    const [loading, setLoading] = useState(false)
    const [product, setProduct]=useState({
        name:'',
        description:'',
        price:'',
        discount:'',
        image:'',
        category_id:''
    });
    const [categories, setCategories] = useState([]);

    const allCategories = ()=>{
        getCategories()
        .then(res =>{
            setCategories(res.data)
        
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
        console.log(data)
        // console.log(image)
        const formData = new FormData();
        // formData.append('image',image);

        // formData.append('image', data.image[0]);
        for (const key in data) {
            formData.append(key, data[key]);
        }
        // console.log(formData)
        
        // console.log(data);
        createProduct(formData)
        .then(res=>{
            console.log(res)
            if(res.status ===200 )
                generateSuccess('Product created successfully')

            setTimeout(()=>navigate('/products'),2000)
        })
        .catch(err =>{
            console.log(err)
            generateError('Something went wrong with the api')
        })
        setLoading(false)
    }

    useEffect(()=>{
        allCategories();
    },[])

    if(loader) return <Loader></Loader>
    return (
        
        <FormProduct loading={loading} type='Crear' product={product} onSubmit={onSubmit} categories={categories} handleImage={handleImage}/>
    )
}
