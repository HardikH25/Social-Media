import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();

const app = express();
mongoose.connect(process.env.dbURL).then(()=>{
    console.log('DB Connected')
}).catch((err)=>{
    console.log(err);
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/users', userRouter)


app.listen(8090,()=>{
    console.log('Server Started at port 8090');
})