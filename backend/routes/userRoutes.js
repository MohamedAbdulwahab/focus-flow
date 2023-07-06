import express from 'express';
import { registerUser, getUserInfo } from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(getUserInfo);

export default router;
