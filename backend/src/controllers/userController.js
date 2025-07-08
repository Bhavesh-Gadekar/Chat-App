import UserModel from '../models/userModel.js';
import userModel from '../models/userModel.js'

export const home=(req,res)=>{

}

export const updatepic=async(req,res)=>{
    try{
        const {profilepic}=req.body;
        const user=req.user;
        const userEmail=user.email;
        if (!profilepic) {
            return res.status(400).json({ error: "No profile picture provided" });
        }

        const updateUser=await UserModel.findOneAndUpdate({email:userEmail},{image:profilepic},{ new: true });
        // console.log(updateUser);
        
    }catch(error){
        console.log(error);
    }
}

export const getuser=(req,res)=>{
    const user=req.user;
    const userId=req.userId;
    res.json({user,userId});
}

export const getusers=async (req,res)=>{
    try{
        const user=req.user;
        const users=await userModel.find({ email: { $ne: user.email} },{password:0});
        res.json(users);
    }catch(error){
        console.log(error);
    }
}

export const getuserpic=async(req,res)=>{
    const user=req.user;
    const userEmail=user.email;
    const User=await UserModel.findOne({email:userEmail})
    // console.log(User.image);
    res.json(User.image);
}