import { ProductsModel } from "./products.js";
import {CategoriesModel} from "./categories.js";

ProductsModel.belongsTo(CategoriesModel,{
    foreignKey:'category_id',
    targetKey:'category_id',
})

CategoriesModel.hasOne(ProductsModel,{
    foreignKey:'category_id',
    targetKey:'category_id',
})

export {CategoriesModel,ProductsModel}