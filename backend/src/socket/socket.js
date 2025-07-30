import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const OnlineUsers = {}; // userId -> socketId

// Get allowed origins from environment variables or use defaults
const getAllowedOrigins = () => {
  const origins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',') 
    : ['http://localhost:5173', 'https://talksphere.netlify.app'];
  
  // In production, also allow the production frontend URL if not already included
  if (process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL) {
    if (!origins.includes(process.env.FRONTEND_URL)) {
      origins.push(process.env.FRONTEND_URL);
    }
  }
  
  return origins;
};

const io = new Server(server, {
  cors: {
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // For legacy browser support
  },
  // Additional Socket.IO options for production
  transports: ['websocket', 'polling'],
  allowEIO3: true // Enable Engine.IO v3 compatibility if needed
});

// Get receiver socket ID helper
export const getRecieverSocketId = (recieverId) => {
  return OnlineUsers[String(recieverId)];
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (recieverId) => {
    OnlineUsers[String(recieverId)] = socket.id;
    console.log(`ReceiverId: ${recieverId} joined with SocketId: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(OnlineUsers)) {
      if (socketId === socket.id) {
        delete OnlineUsers[userId];
        console.log(`User disconnected: ${userId} with SocketId: ${socket.id}`);
        break;
      }
    }
  });
});

export { app, server, io };
