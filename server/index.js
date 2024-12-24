import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js"

dotenv.config({
    path: './.env'
})

// Initialize Express app
const app = express()

// Middlewares
app.use(express.json())                                 // for parsing json/header (form input) data
app.use(express.urlencoded({extended: true}))           // for parsing url encoded data
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true                                   // allow cross-origin credentials stored in cookies (JWT authentication)
}))
app.use(cookieParser())                                 // perform crud on cookies data (from client)

// routes
app.use("/api/user", userRoutes)

// Connect to MongoDB (local)
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at @ http://localhost:${process.env.PORT}/api/user/signup`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
