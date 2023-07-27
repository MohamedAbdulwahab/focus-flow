import express from 'express';
import {
  registerUser,
  getUserInfo,
  updateDisplayName,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/:id').put(updateDisplayName);
router.route('/login').post(getUserInfo);

export default router;
