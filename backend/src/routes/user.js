import express from 'express'
import { home,getuser,getusers,updatepic,getuserpic } from '../controllers/userController.js';
import verifyUser from '../middleware/verifyUser.js';

const router=express.Router();

router.get('/',verifyUser,home);
router.post('/updatepic',verifyUser,updatepic)
router.get('/getuser',verifyUser,getuser);
router.get('/getusers',verifyUser,getusers);
router.get('/getuserpic',verifyUser,getuserpic);

export default router;