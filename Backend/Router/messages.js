import express from 'express'; 
import { fetchMessages, postMessages } from '../controllers/messagesController.js'; 
import authMiddleware from '../middlewares/auth.js';

const router = express.Router(); 

router.get('', fetchMessages);

router.post('', authMiddleware, postMessages);

export default router;