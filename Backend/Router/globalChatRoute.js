import express from 'express'; 
import { fetchGlobalMessages, postGlobal } from '../controllers/globalChatController.js'; 

const router = express.Router(); 

router.get('/global', fetchGlobalMessages);

router.post('/global',postGlobal);

export default router;