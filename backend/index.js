import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectdb from "./src/db.js";
import authRoutes from "./src/routes/auth.js";
import userRoutes from './src/routes/user.js';
import messageRoutes from './src/routes/message.js';
import cookieParser from "cookie-parser";

import { app, server } from "./src/socket/socket.js";

configDotenv();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

// CORS must be set in both Express and Socket.IO
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://talksphere.netlify.app'
  ],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', authRoutes);
app.use('/home', userRoutes);
app.use('/home/message', messageRoutes);

server.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} Successfully !!`);
  connectdb();
});
