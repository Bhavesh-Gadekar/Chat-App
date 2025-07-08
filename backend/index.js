import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectdb from "./src/db.js";
import authRoutes from "./src/routes/auth.js";
import userRoutes from './src/routes/user.js';
import messageRoutes from './src/routes/message.js'
import cookieParser from "cookie-parser";

import { app,server } from "./src/socket/socket.js";

// const app=express();
configDotenv();

const PORT=process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:["GET","POST","DELETE","PUT"]
}));

app.use('/api/auth',authRoutes);
app.use('/home',userRoutes);
app.use('/home/message',messageRoutes);

server.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT} Successfully !!`)
    connectdb();
});