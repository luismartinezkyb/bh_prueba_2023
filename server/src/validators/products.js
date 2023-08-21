import { check, param } from "express-validator";
import { validateResults } from "../utils/handleValidate.js";


const validatorGetProduct = [
    param('product_id').exists().notEmpty().isNumeric().toInt(),
    (req, res, next)=>validateResults(req, res, next)
]


const validatorCreate = [
    check('name').exists().notEmpty(),
    check('description').exists().notEmpty(),
    check('price').exists().notEmpty().isNumeric().toFloat(),
    check('discount').optional().notEmpty().isNumeric().toFloat(),
    check('category_id').exists().notEmpty().isNumeric().toInt(),
    (req, res, next)=>validateResults(req, res, next)
];

const validatorUpdateProduct = [
    param('product_id').exists().notEmpty().isNumeric().toInt(),
    check('name').exists().notEmpty(),
    check('description').exists().notEmpty(),
    check('in_stock').exists().notEmpty().isBoolean().toBoolean(),
    check('price').exists().notEmpty().isNumeric().toFloat(),
    check('discount').optional().notEmpty().isNumeric().toFloat(),
    check('category_id').exists().notEmpty().isNumeric().toInt(),
    (req, res, next)=>validateResults(req, res, next)
    
]
const validatorDeleteProduct = [
    param('product_id').exists().notEmpty().isNumeric().toInt(),
    (req, res, next)=>validateResults(req, res, next)
]

export {
    validatorGetProduct,
    validatorCreate,
    validatorUpdateProduct,
    validatorDeleteProduct
}