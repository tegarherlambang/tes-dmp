import { Request, Response } from "express";
import Helper from "../helpers/responseHandler";
import axios from "axios";

const List = async (req:Request, res:Response):Promise<Response>=>{
    try {
        const {page, description, location, fulltime} = req.query
        let params = {}
        if (page) {
            params = {
                ...params,
                page
            }
        }
        if (description) {
            params = {
                ...params,
                description
            }
        }
        if (location) {
            params = {
                ...params,
                location
            }
        }
        if (fulltime) {
            params = {
                ...params,
                full_time:fulltime
            }
        }
        
        const job = await axios.get('http://dev3.dansmultipro.co.id/api/recruitment/positions.json',{
            params
        })
        return res.status(201).json(Helper.responseData(true,"List Job",null,job.data))
    } catch (error:any) {
        return res.status(500).json(Helper.responseData(false,"",error,null))
    }
}
const Detail = async (req:Request, res:Response):Promise<Response>=>{
    try {
        const {id} = req.params
        const job = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`,{
        })
        return res.status(201).json(Helper.responseData(true,"List Job",null,job.data))
    } catch (error:any) {
        return res.status(500).json(Helper.responseData(false,"",error,null))
    }
}

export default {List, Detail}