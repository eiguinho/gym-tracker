import { Router } from 'express';
import { getAllExercises } from '../controllers/exerciseController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protect, getAllExercises);

export default router;