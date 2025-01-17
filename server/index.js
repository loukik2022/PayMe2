import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'

import connectDB from "./config/db.js";

import stripeService from "./stripeService.js"
import userRoutes from "./routes/userRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"
import subscriptionRoutes from './routes/subscriptionRoutes.js'

dotenv.config()

const app = express()

// middlewares
app.use((req, res, next) => {   // Conditional middleware to skip parsing for specific routes
    if (req.originalUrl === "/stripe/webhook") next(); 
    else express.json()(req, res, next); 
});
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true       // allow cross-origin credentials stored in cookies (JWT authentication)
}))
app.use(cookieParser())     // perform crud on cookies data (from client)

// routes
app.use('/stripe', stripeService)
app.use('/api/users', userRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/subscriptions', subscriptionRoutes)

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
