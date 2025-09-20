import express from 'express';
import userAuthRoutes from './userAuthRoutes.js';
import planRoutes from './planRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import contentRoutes from './contentRoutes.js';

const router = express.Router();

router.use('/users', userAuthRoutes);
router.use('/plans', planRoutes);
router.use('/payments', paymentRoutes);
router.use('/content', contentRoutes);

export default router;