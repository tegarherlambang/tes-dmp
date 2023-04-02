import express from "express"
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()

export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }
export const tokenCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
   
      if (!token) {
        throw new Error();
      }
   
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as CustomRequest).token = decoded;
   
      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
   };

import UserController from "../controllers/UserController";
import JobListController from "../controllers/JobListController";

router.post('/login', UserController.Login)
router.get('/job-list', tokenCheck, JobListController.List)
router.get('/job-list/:id/detail', tokenCheck, JobListController.Detail)

export default router