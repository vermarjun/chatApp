import express from 'express'; 
import { registerUser, login, logoutUser, changepassword, updateprofile } from '../controllers/userController.js'; 
import authMiddleware from '../middlewares/auth.js';

const router = express.Router(); 

router.post('/register',registerUser);

router.post('/login', login);

router.get('/logout', logoutUser);

// Profile update route (with authentication middleware)
router.post('/changepassword', authMiddleware, changepassword);
router.post('/updateprofile', authMiddleware, updateprofile);

export default router;
