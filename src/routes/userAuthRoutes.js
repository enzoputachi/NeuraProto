import express from 'express';
import { getProfile, handleVerifyToken, login, logout, signup, updateProfile } from '../controllers/userAuthController.js';
import { authenticate } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/verify', handleVerifyToken)
router.get('/profile', authenticate, getProfile)
router.patch('/profile', authenticate, updateProfile)


export default router;