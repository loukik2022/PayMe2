import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'

import connectDB from "./config/db.js";

import stripeService from "./stripeService.js"
import userRoutes from "./routes/userRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config({
    path: './.env'
})

const app = express()

// middlewares
app.use(express.json())                                 
app.use(express.urlencoded({extended: true}))           
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true       // allow cross-origin credentials stored in cookies (JWT authentication)
}))
app.use(cookieParser())     // perform crud on cookies data (from client)

// routes
app.use('/stripe', stripeService)
app.use("/api/users", userRoutes)
app.use('/api/transactions', transactionRoutes)

// connect to MongoDB (local)
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at @ http://localhost:${process.env.PORT}/api/users/signup`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
})
