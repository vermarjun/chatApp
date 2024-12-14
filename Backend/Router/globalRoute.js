import express from 'express'; 
import { fetchGlobalMessages, postGlobal } from '../controllers/globalChatController.js'; 
import authMiddleware from '../middlewares/auth.js';

const router = express.Router(); 

router.get('', fetchGlobalMessages);

router.post('', authMiddleware ,postGlobal);

export default router;