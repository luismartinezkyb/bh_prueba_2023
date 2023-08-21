//imports
import express from 'express';
import dotenv from 'dotenv';
import { dbConnectMysql } from './config/mysql.js';
import productsRoutes from './routes/products.js'

//config && initialization
dotenv.config()
dbConnectMysql();
const PORT = process.env.PORT || 3001;
const app = express();

//middlewares
app.use(express.json())
app.use(express.static(`./src/storage`));//i can

//routes
app.use('/api/products', productsRoutes);

//listen
app.listen(PORT, (err,res)=>console.log(`app running at http://localhost:${PORT}`));