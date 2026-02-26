import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { getDashboardStats } from '../controllers/statsController';

const router = Router();

router.get('/dashboard', protect, getDashboardStats);

export default router;