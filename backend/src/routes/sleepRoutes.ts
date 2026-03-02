import { Router } from 'express';
import { saveSleepLog, getSleepLogs } from '../controllers/sleepController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, saveSleepLog);
router.get('/', protect, getSleepLogs);

export default router;