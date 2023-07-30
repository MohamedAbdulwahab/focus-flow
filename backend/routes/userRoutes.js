import express from 'express';
import {
  registerUser,
  getUserInfo,
  updateDisplayName,
  updateEmail,
} from '../controllers/userController.js';
import { ensureAuth } from '../middleware/ensureAuth.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(getUserInfo);
router.route('/:id').put(updateDisplayName);
router.route('/:id/email').put(updateEmail);

export default router;
