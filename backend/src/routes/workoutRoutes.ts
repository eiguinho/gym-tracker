import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createWorkout,
  getMyWorkouts,
  getAvailableExercises,
  deleteWorkout,
  getWorkoutById,
  updateWorkout,
  toggleWorkoutActive,
  updateWorkoutOrders
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

// Rotas Gerais
router.post('/', protect, createWorkout); // Cria treino
router.get('/', protect, getMyWorkouts); // Lista todos os treinos do usuário

// Rotas Específicas por ID
router.get('/:id', protect, getWorkoutById); // Busca UM treino específico
router.put('/:id', protect, updateWorkout); // Atualiza UM treino específico
router.delete('/:id', protect, deleteWorkout); // Deleta UM treino específico

router.patch('/:id/toggle-active', protect, toggleWorkoutActive);
router.patch('/reorder', protect, updateWorkoutOrders);

export default router;
