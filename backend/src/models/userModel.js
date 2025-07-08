import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    }
})

const UserModel=mongoose.model('users',UserSchema);

export default UserModel;