import express from 'express';
import { createPayment, updatePaymentStatus, getUserPayments, getPaymentById } from '../controllers/paymentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createPayment);
router.patch('/:paymentId', authenticate, updatePaymentStatus);
router.get('/user/:userId', authenticate, getUserPayments);
router.get('/:paymentId', authenticate, getPaymentById);

export default router;