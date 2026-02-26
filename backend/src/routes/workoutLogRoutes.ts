import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createWorkoutLog,
  getWorkoutLogs,
  updateWorkoutLog,
  deleteWorkoutLog
} from '../controllers/workoutLogController';

const router = Router();

router.route('/')
  .post(protect, createWorkoutLog)
  .get(protect, getWorkoutLogs);

router.route('/:id')
  .put(protect, updateWorkoutLog)
  .delete(protect, deleteWorkoutLog);

export default router;