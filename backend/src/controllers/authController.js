import UserModel from '../models/userModel.js'
import { configDotenv } from 'dotenv';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

configDotenv();

export const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.json("User Already Exists !!")
        }
        await UserModel.create({ firstname, lastname, email, password: hashPassword })
        console.log("User Created !!")
        res.json("success");
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json("No user found !!");
        }
        const verify = await bcrypt.compare(password, user.password);
        if (!verify) {
            return res.json("Invalid Credentials !!")
        }
        const token = jwt.sign({ firstname: user.firstname, lastname: user.lastname, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict', // helps with CSRF protection
            maxAge: 60 * 60 * 1000
        });
        res.json("success");
    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
    });
    res.json("logout Successfully !!")
}