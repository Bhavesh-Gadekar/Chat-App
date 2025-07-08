import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const OnlineUsers = {}; // userId -> socketId

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://talksphere.netlify.app'],
    methods: ['GET', 'POST'],
    credentials: true
  }
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
