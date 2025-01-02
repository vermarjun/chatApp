import express from 'express'; 
import { createRoom, fetchAllRooms, fetchRooms, joinRoom } from '../controllers/roomChatController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router(); 

router.post('/create', authMiddleware, createRoom);
router.get('', authMiddleware, fetchRooms);
router.get('/all', authMiddleware ,fetchAllRooms);
router.post('/join', authMiddleware, joinRoom);
export default router;