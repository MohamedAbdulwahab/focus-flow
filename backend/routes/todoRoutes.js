import express from 'express';
import {
  getTodos,
  createTodo,
  markComplete,
  markIncomplete,
  updateTask,
  deleteTask,
} from '../controllers/todosController.js';
import { ensureAuth } from '../middleware/ensureAuth.js';

const router = express.Router();

router.route('/:userId').get(ensureAuth, getTodos);
router.route('/').post(ensureAuth, createTodo);
router.route('/tasks/:id').delete(ensureAuth, deleteTask);
router.route('/:id/complete').put(ensureAuth, markComplete);
router.route('/:id/incomplete').put(ensureAuth, markIncomplete);
router.route('/update/:id').put(ensureAuth, updateTask);

export default router;
