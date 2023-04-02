import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()

const db = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD as string,{
    host:process.env.DB_HOST,
    dialect:'postgres',
    port:Number(process.env.DB_PORT)
})

if (process.env.DB_MIGRATE?.toLocaleLowerCase() as string == "true") {
    db.sync({ alter: true });
    console.log("All models were synchronized successfully.");
}

export default db