import { Router } from 'express';
import { getRecommendedTemplates, cloneTemplate } from '../controllers/templateController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.get('/', getRecommendedTemplates);
router.post('/:id/clone', cloneTemplate);

export default router;