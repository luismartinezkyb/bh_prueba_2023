import { DataTypes } from "sequelize";

import { sequelize } from "../config/mysql.js";


export const ProductsModel = sequelize.define(
    'products',
    {
        product_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        image:{
            type:DataTypes.STRING,
        },
        in_stock:{
            type:DataTypes.BOOLEAN,
            defaultValue:true,
        },
        discount:{
            type:DataTypes.DECIMAL(5,2),
            defaultValue:0.0
        },
        created_at:{
            type: 'TIMESTAMP',
            defaultValue:sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at:{
            type: 'TIMESTAMP',
            defaultValue:sequelize.literal('CURRENT_TIMESTAMP'),
        },
        category_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps:false,
        tableName:'products'
    }
)