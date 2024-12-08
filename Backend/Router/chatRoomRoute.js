import express from 'express'; 
import {  } from '../controllers/userController.js'; 

const router = express.Router(); 

router.post('/register',registerUser);

router.post('/login', login);

router.get('/logout', logoutUser);

export default router;