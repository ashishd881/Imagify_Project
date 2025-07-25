import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'  //extension ke saath likho
import userRouter from './Routes/userRoutes.js'
import imageRouter from './Routes/ImageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()  //connect express app with mongo db database

// create application/json parser
// app.use(bodyParser.json());
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/',(req,res)=> res.send("API Working"))

app.listen(PORT,()=>console.log('Server running on Port' + PORT));   //comment added to ckecck