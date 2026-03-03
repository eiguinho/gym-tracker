import { Router } from 'express';
import { saveSleepLog, getSleepLogs, deleteSleepLog } from '../controllers/sleepController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, saveSleepLog);
router.get('/', protect, getSleepLogs);
router.delete('/:id', protect, deleteSleepLog);

export default router;