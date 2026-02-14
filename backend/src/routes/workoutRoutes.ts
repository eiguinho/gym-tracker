import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createWorkout,
  getMyWorkouts,
  getAvailableExercises,
  deleteWorkout,
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
router.delete('/:id', protect, deleteWorkout)

export default router;
