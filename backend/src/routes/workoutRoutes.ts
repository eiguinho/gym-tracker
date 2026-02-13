import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createWorkout,
  getMyWorkouts,
  getAvailableExercises,
} from '../controllers/workoutController';

const router = Router();
router.get(
  '/exercises',
  protect,
  (req, res, next) => {
    next();
  },
  getAvailableExercises,
);
router.post('/', protect, createWorkout); // Cria treino
router.get('/', protect, getMyWorkouts); // Lista treinos do usuário

export default router;
