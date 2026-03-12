import { Router } from 'express';
import { register, login, verifyEmail, forgotPassword, resetPassword, updateProfile, deleteProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile);

export default router;
