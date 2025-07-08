import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const OnlineUsers = {}; // Stores userId to socketId mapping

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://talksphere.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST']
  }
});

// Helper function to get receiver's socket ID
export const getRecieverSocketId = (recieverId) => {
  // Make sure recieverId is a string before accessing the socket id
  return OnlineUsers[String(recieverId)]; // Convert to string just to be safe
}

// Handle new socket connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // When a user joins, store their socket.id in OnlineUsers using recieverId
  socket.on('join', (recieverId) => {
    // Ensure recieverId is a string key
    OnlineUsers[String(recieverId)] = socket.id;
    console.log(`ReceiverId: ${recieverId} joined with SocketId: ${socket.id}`);
  });

  // Listen for the 'disconnect' event to clean up the socket list
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(OnlineUsers)) {
      if (socketId === socket.id) {
        delete OnlineUsers[userId]; // Remove the user from the OnlineUsers object
        console.log(`User disconnected: ${userId} with SocketId: ${socket.id}`);
        break;
      }
    }
  });
});

export { app, server, io };
