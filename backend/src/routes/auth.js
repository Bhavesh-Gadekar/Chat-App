import express from 'express'
import { login, logout, signup } from '../controllers/authController.js';

const router=express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.delete('/logout',logout);

export default router;