import axios from "axios";
const VITE_URL_API = import.meta.env.VITE_URL_API;

const productsApi = axios.create({
    baseURL: `${VITE_URL_API}/api/products`
})

export const getProducts = async()=>{
    const res = await productsApi.get('/all');
    console.log(res)
    return res;
}

export const getProduct = async(product_id)=>{
    const res = await productsApi.get(`/one/${product_id}`);
    return res;
}

export const createProduct = async(product)=>{
    console.log("PRODUCT", product)
    const res = await productsApi.post('/create', product);
    return res;
}

export const updateProduct = async(product, product_id)=>{
    console.log("PRODUCTO A ENVIAR",product)
    const res = await productsApi.put(`/update/${product_id}`, product);
    return res;
}

export const deleteProduct = async(product_id)=>{
    const res = await productsApi.delete(`/delete/${product_id}`);
    return res;
}


export const getCategories = async()=>{
    const res = await productsApi.get(`/categories/all/`);
    return res;
}