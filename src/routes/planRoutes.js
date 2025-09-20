import express from 'express';
import { getAllPlans, getPlanById, createPlan, updatePlan, assignPlanToUser, getPlansByPriceRange, deletePlan, getPlansCount } from '../controllers/planController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPlans);
router.get('/count', getPlansCount);
router.get('/price-range', getPlansByPriceRange);
router.get('/:planId', getPlanById);
router.post('/', authenticate, createPlan);
router.patch('/:planId', authenticate, updatePlan);
router.post('/assign', authenticate, assignPlanToUser);
router.delete('/:planId', authenticate, deletePlan);

export default router;