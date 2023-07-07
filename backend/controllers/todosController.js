import asyncHandler from 'express-async-handler';
import Todos from '../models/todosModel.js';

// @desc    Fetch all todos
// @route   GET /api/todos
// @access  Public
const getTodos = asyncHandler(async (req, res) => {
  // access the logged in user using req.user. (I set it up in the ensureAuth middleware)
  // console.log(req.user);

  // Find all todos
  const todos = await Todos.find({});

  // Check if todos are found
  if (todos.length > 0) {
    res.json({
      todos,
    });
  } else {
    res.status(404);
    throw new Error('Todos not found');
  }
});

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
const createTodo = asyncHandler(async (req, res) => {
  const { todo } = req.body;

  // Create a new instance of the Todos model with the provided data
  const newTodo = new Todos({
    userId: '01',
    todo,
  });

  // Save the new todo to the database
  const createdTodo = await newTodo.save();

  // Todo has been created
  if (createdTodo) {
    res.status(201).json({
      todo: createdTodo,
      message: 'Todo created successfully',
    });
  } else {
    res.status(500);
    throw new Error('Failed to create a new todo');
  }
});

// @desc    mark todo as complete (By id)
// @route   PUT /api/todos/:id
// @access  Public
const markComplete = asyncHandler(async (req, res) => {
  const todoId = req.params.id;

  // Update the completed property
  const result = await Todos.updateOne(
    { _id: todoId },
    { $set: { completed: true } }
  );

  // Check the result
  if (result.modifiedCount === 1) {
    res.status(201).json({
      message: 'Todo marked as completed',
    });
  } else {
    res.status(404);
    throw new Error('Todo not found or already marked as completed');
  }
});

// @desc    mark todo as incomplete (By id)
// @route   PUT /api/todos/:id
// @access  Public
const markIncomplete = asyncHandler(async (req, res) => {
  const todoId = req.params.id;

  // Update the completed property
  const result = await Todos.updateOne(
    { _id: todoId },
    { $set: { completed: false } }
  );

  // Check the result
  if (result.modifiedCount === 1) {
    res.status(201).json({
      message: 'Todo marked as incomplete',
    });
  } else {
    res.status(404);
    throw new Error('Todo not found or already marked as incompleted');
  }
});

// @desc    Delete todo (By id)
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = asyncHandler(async (req, res) => {
  // Get the todo id from the req.params
  const todoId = req.params.id;

  // Delete todo by id
  const result = await Todos.deleteOne({ _id: todoId });

  // Check if any document was deleted
  if (result.deletedCount === 1) {
    res.json({
      message: 'Todo deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('Todo not found');
  }
});

export { getTodos, createTodo, markComplete, deleteTodo, markIncomplete };
