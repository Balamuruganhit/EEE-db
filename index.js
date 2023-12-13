import express from 'express'
// import mysql from 'mysql'
 import cors from 'cors'
 import { employeesRouter } from './Routes/EmployeesRoutes.js';
// import cookieParser from 'cookie-parser'
// import bcrypt from 'bcrypt'
// imporst jwt from 'jsonwebtoken'
// import multer from 'multer'
// import path from 'path'
import { dataRouter } from './Routes/DataRoutes.js';

import {google} from 'googleapis'
const app= express();
app.use(cors({
	origin: ['http://localhost:3000'],
	methods :['GET','POST','PUT'],
	credentials:true
}
))
app.use(express.json())
app.use('/auth',employeesRouter)
app.use('/data',dataRouter)


app.listen(5000, () =>{
	console.log("server is runing")
})