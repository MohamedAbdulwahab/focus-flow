import mongoose from 'mongoose';

const todosSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      // ref: 'User',
    },
    todo: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestaps: true,
  }
);

const Todos = mongoose.model('Todos', todosSchema);
export default Todos;
