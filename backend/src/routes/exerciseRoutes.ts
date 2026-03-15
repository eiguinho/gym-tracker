import { Router } from 'express';
import { getAllExercises } from '../controllers/exerciseController';
import { protect } from '../middleware/authMiddleware'; // Garante que só logados vejam

const router = Router();

// Rota protegida: o usuário precisa estar logado para ver a lista
router.get('/', protect, getAllExercises);

export default router;