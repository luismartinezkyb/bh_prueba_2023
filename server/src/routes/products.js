import { Router } from "express";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.js";
import {
    validatorGetProduct,
    validatorCreate,
    validatorUpdateProduct,
    validatorDeleteProduct
} from '../validators/products.js'
import { uploadMiddleware } from "../utils/handleStorage.js";
const router = Router();

router.get('/all/', getAllProducts);
router.get('/one/:product_id', validatorGetProduct, getProduct);
router.post('/create/', uploadMiddleware.single('image'), validatorCreate, createProduct);
router.put('/update/:product_id', uploadMiddleware.single('image'), validatorUpdateProduct, updateProduct);
router.delete('/delete/:product_id', validatorDeleteProduct, deleteProduct);
// router.get('/all/', getAllProducts);

export default router;

