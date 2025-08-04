import express from 'express';
import { getCurrentUserProfile, handleVerifyToken, login, logout, register } from '../controllers/userAuthController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { updateCurrentUserProfile } from '../services/userAuthServices.js';


const router = express.Router();

router.post('/signup', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/verify', handleVerifyToken)
router.get('/profile', authenticate, getCurrentUserProfile)
router.patch('/profile', authenticate, updateCurrentUserProfile)


export default router;