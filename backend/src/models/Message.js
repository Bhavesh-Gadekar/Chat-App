import mongoose, { mongo, Types } from "mongoose";

const MessageSchema=mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

const MessageModel=mongoose.model('Message',MessageSchema);
export default MessageModel;