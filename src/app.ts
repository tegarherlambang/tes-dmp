import express,{Request, Response} from "express";
import router from "./routes/routes";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config()

const app = express()
app.use(cors<Request>());
app.use(express.json())
app.get("/",(req:Request, res:Response)=>{
    return res.status(200).json({
        message:"Success"
    })
})
app.use(router)
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`${process.env.APP_NAME} running on port ${process.env.PORT || 3000}`)
})