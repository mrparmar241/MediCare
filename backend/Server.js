import express from 'express'
import cors from "cors"
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRoute from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app =express()
const PORT = process.env.PORT || 5000

// CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "https://playful-mandazi-6ebbf9.netlify.app"
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// middlewares
app.use(express.json())

// MongoDB connection
connectDB()

// Cloudinary Connection
connectCloudinary()


//  api endpoints
app.use('/api/admin',adminRoute)
app.use('/api/doctor',doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req,res)=>{
    res.send('🚀BACKEND API RUNNING ')
})

app.listen(PORT, ()=> console.log(`🚀 Server Running on Port ${PORT}`))