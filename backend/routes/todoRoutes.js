import express from 'express';
import {
  getTodos,
  createTodo,
  markComplete,
  markIncomplete,
  updateTask,
  deleteTask,
} from '../controllers/todosController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';
import { ensureAuth } from '../middleware/ensureAuth.js';

const router = express.Router();

router.route('/:userId').get(ensureAuth, getTodos);
router.route('/').post(createTodo);
router.route('/tasks/:id').delete(deleteTask);
router.route('/:id/complete').put(markComplete);
router.route('/:id/incomplete').put(markIncomplete);
router.route('/update/:id').put(updateTask);

export default router;
