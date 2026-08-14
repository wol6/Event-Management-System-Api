import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import cookieParser from 'cookie-parser'
import route from './routes/route.js'

const app = express()

app.use(cors({
    origin: process.env.FRONTENDURL,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', route)

app.get('/api/test',(req,res)=>{
    res.end('Api Version : v.2.0.12')
})

app.use((err,req,res,next)=>{
    console.log("Internal Server Error",err)
    res.status(500).json({
        message:err.message || "Internal Server Error"
    })
})

mongoose.connect(process.env.URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to Server...`)
    })
}).catch((error) => {
    console.log("Connection Failed...",error)
})