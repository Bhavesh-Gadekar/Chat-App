import express from "express";
import ConversationModel from '../models/Conversation.js'
import MessageModel from "../models/Message.js"
import verifyUser from "../middleware/verifyUser.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

const router = express.Router();


router.get('/read/:recieverId', verifyUser, async (req, res) => {
    try {
        const { recieverId } = req.params;
        const senderId = req.userId;

        const conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, recieverId] }
        });
        // console.log(conversation);
        if (!conversation) {
            return res.json([])
        }

        const message = await MessageModel.find({
            conversationId: conversation._id
        }).sort({ createdAt: 1 })

        return res.status(200).json(message);

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

router.post('/send/:recieverId', verifyUser, async (req, res) => {
    const { recieverId } = req.params;
    const senderId = req.userId;
    const { content } = req.body;

    try {
        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, recieverId] }
        });

        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, recieverId]
            })
        }
        // console.log(conversation._id);
        const newMessage = await MessageModel.create({
            conversationId: conversation._id,
            senderId: senderId,
            content: content,
            createdAt: new Date()
        })
        // Retrieve the reciever's socket ID
        const recieverSocketId = getRecieverSocketId(recieverId);
        console.log('Receiver Socket ID:', recieverSocketId); // Log the receiver's socket ID

        // If the reciever's socket is found, emit the message
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
            console.log("Message emitted to receiver:", recieverId);
        }

        return res.json(newMessage)
    } catch (error) {
        console.log(error);
    }

})

export default router;