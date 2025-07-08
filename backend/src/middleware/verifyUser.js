import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

const verifyUser = async(req, res, next) => {
    const token = req.cookies.token;
    // console.log("token:", token);
    if (!token) {
        return res.json("unauthorized")
    }
    try {
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        const userId=await UserModel.findOne({email:user.email});
        // console.log(userId._id);
        req.userId=userId._id;
        next();
    } catch (err) {
        console.log(err)
    }
}

export default verifyUser;