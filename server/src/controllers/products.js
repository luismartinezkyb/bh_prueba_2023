import { handleHttpError } from "../utils/handleErrors.js"
import { ProductsModel, CategoriesModel } from "../models/associations.js"
import { matchedData } from "express-validator";
import {writeFileSync, readFileSync, unlinkSync, existsSync} from 'fs';
import * as url from 'url';
import dotenv from 'dotenv';

dotenv.config()
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const getAllProducts = async(req, res) =>{

    try {
        const data = await ProductsModel.findAll({
            include:{
                model: CategoriesModel
            }
        });
        if(!data){
            return handleHttpError(res, 'Product not found', 401);
        }

        res.status(200).json(data);
    } catch (error) {
        console.log("GET ALL PRODUCTS",error)
        handleHttpError(res, 'Something went wrong with GET ALL PRODUCTS', 401)
        return;
    }
}

const getProduct = async(req, res)=>{
    try {
        req= matchedData(req);
        const {product_id} = req;
        console.log(product_id)
        const data = await ProductsModel.findOne({
            where: {
                product_id
            },
            include: [{
                model:CategoriesModel
            }]
        })
        if(!data){
            return handleHttpError(res, 'product not found!');
        }

        res.status(200).json(data);
    } catch (error) {
        console.log('GET PRODUCT', error)
        handleHttpError(res, 'Something went wrong with GET PRODUCT');
    }
}

const createProduct = async(req, res)=>{
    try {
        const {file}= req;
        let image = '';
        if(file){
            const ext = file.originalname.split('.').pop();
            image = `file-${Date.now()}.${ext}`;
            
        }else{
            image='not_image.jpg';
        }
        req = matchedData(req)
        const body = {...req,image}
        const data = await ProductsModel.create(body);

        if(!data){
            return handleHttpError(res, 'Error creating product')
        }

        if(file){
            writeFileSync(`${__dirname}../storage/${image}`, file.buffer);
            res.status(200).json(data);
            return;
        }
        res.status(200).json(data);
    } catch (error) {
        console.log('CREATE PRODUCT', error)
        handleHttpError(res, 'Something went wrong with CREATE PRODUCT');

    }
}

const updateProduct = async(req, res)=>{
    try {
        const {file} = req;
        let image='not_image.jpg';
        
        req = matchedData(req)
        const product = await ProductsModel.findOne({
            where: req.product_id
        });

        if(!product){
            return handleHttpError(res, 'Product not found', 401)
        }
        //si el producto ya tiene una imagen entonces cambiamos el nombre de imagen a la imagen del producto
        if(product.image){
            image=product.image;
        }

        //Si existe un archivo en el req entonces tenemos que crear el nuevo nombre de la imagen
        // y necesitamos añadir ese archivo al servidor
        if(file){
            const ext = file.originalname.split('.').pop();
            image = `file-${Date.now()}.${ext}`;
            writeFileSync(`${__dirname}../storage/${image}`, file.buffer);
            //si el producto tiene una imagen, es diferente y existe, tendremos que borrarlo
            if(product.image && product.image !== 'not_image.jpg' && existsSync(`${__dirname}../storage/${product.image}`)){
                unlinkSync(`${__dirname}../storage/${product.image}`);
            }
        }
        
        //definimos el nuevo body con la nueva imagen y actualizamos
        const body = {...req, image}
        await product.update(body);

        res.status(200).json(product);
    } catch (error) {
        console.log('UPDATE PRODUCT', error)
        handleHttpError(res, 'Something went wrong with UPDATE PRODUCT');

    }
}
const deleteProduct = async(req, res)=>{
    try {
        req = matchedData(req);
        const {product_id} = req;

        const product = await ProductsModel.findOne({
            where: {
                product_id
            }
        })

        if(!product) return handleHttpError(res, 'Product not found');
        
        const data = await ProductsModel.destroy({
            where:{
                product_id
            }
        })

        if(!data) return handleHttpError(res, 'An error has occurred while deleting the product')
        
        if(product.image !=='not_image.jpg'){
            unlinkSync(`${__dirname}../storage/${product.image}`)
        }

        res.status(200).send('Product deleted successfully');
        
    } catch (error) {
        console.log('DELETE PRODUCT', error);
        handleHttpError(res, 'Something went wrong with DELETE PRODUCT');
    }
}


export {getAllProducts, getProduct, updateProduct, deleteProduct,createProduct}