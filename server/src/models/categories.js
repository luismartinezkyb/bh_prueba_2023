import { DataTypes } from "sequelize";

import { sequelize } from "../config/mysql.js";


export const CategoriesModel = sequelize.define(
    'categories',
    {
        category_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        timestamps:false,
        tableName:'categories'
    }

);