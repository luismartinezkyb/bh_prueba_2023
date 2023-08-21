import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const {
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST
} = process.env;

export const sequelize = new Sequelize(
    DB_DATABASE, 
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect:'mysql',
        logging: false //this line avoids logging the query every single time
    },
    

);

export const dbConnectMysql = async ()=>{
    
    try {
        await sequelize.authenticate();
        console.log("CONECTION TO MYSQL SUCCESSFUL");
    } catch (error) {  
        console.log("ERROR TRYING TO CONNECT TO MYSQL", error)
    }
}