import axios from "axios";
const URL_API = import.meta.VITE_URL_API;

const productsApi = axios.create({
    baseURL: `${URL_API}/api/products`
})

export const getProducts = async()=>{
    const res = await productsApi.get('/all');
    console.log(res)
    return res;
}

export const getProduct = async(product_id)=>{
    const res = await productsApi.get(`/one/${product_id}`);
    console.log(res)
    return res;
}

export const createProduct = async(product)=>{
    const res = await productsApi.post('/create', product);
    console.log(res);
    return res;
}

export const updateProduct = async(product)=>{
    const res = await productsApi.put(`/update/${product.product_id}`, product);
    console.log(res)
    return res;
}

export const deleteProduct = async(product_id)=>{
    const res = await productsApi.delete(`/delete/${product_id}`);
    console.log(res);
    return res;
}