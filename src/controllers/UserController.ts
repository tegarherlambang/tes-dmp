import { Request, Response } from "express";
import Users from "../db/models/Users";
import Helper from "../helpers/responseHandler";
import Hash from "../helpers/Hash";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

const Login = async (req:Request, res:Response):Promise<Response>=>{
    try {
        const {username, password} = req.body

        const user = await Users.findOne({
            where:{
                username:username as string
            }
        })
        if (!user) {
            return res.status(404).json(Helper.responseData(false,"Wrong username or password",null,req.body))
        }
        const isMatch = bcrypt.compareSync( password as string, user.password);
        if (!isMatch) {
            return res.status(404).json(Helper.responseData(false,"Wrong username or password",null,req.body))
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '2 days',
          });
        return res.status(201).json(Helper.responseData(true,"Login Successfully",null,token))
    } catch (error:any) {
        return res.status(500).json(Helper.responseData(false,"",error,null))
    }
}

export default {Login}