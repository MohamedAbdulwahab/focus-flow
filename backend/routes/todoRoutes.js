import express from 'express';
import {
  getTodos,
  createTodo,
  markComplete,
  markIncomplete,
  deleteTodo,
} from '../controllers/todosController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';
import { ensureAuth } from '../middleware/ensureAuth.js';

const router = express.Router();

router.route('/').get(ensureAuth, getTodos).post(createTodo);
router.route('/:id').delete(deleteTodo);
router.route('/:id/complete').put(markComplete);
router.route('/:id/incomplete').put(markIncomplete);

export default router;
