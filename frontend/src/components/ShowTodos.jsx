import { useState } from 'react';
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import EditTaskForm from './EditTaskForm';
import { toast } from 'react-toastify';
import {
  useDeleteTaskMutation,
  useMarkCompleteMutation,
  useMarkIncompleteMutation,
} from '../store/apiSlices/todosApiSlice';

const ShowTodos = ({ todo }) => {
  const [editTask, setEditTask] = useState(false);

  /* mark a single task as completed */
  const [
    markComplete,
    {
      isLoading: markCompleteTaskLoading,
      isError: markCompleteTaskIsError,
      error: markCompleteTaskError,
    },
  ] = useMarkCompleteMutation();

  /* mark a single task as incomplete */
  const [
    markIncomplete,
    {
      isLoading: markIncompleteTaskLoading,
      isError: markIncompleteTaskIsError,
      error: markIncompleteTaskError,
    },
  ] = useMarkIncompleteMutation();

  /* delete a single task */
  const [
    deleteTask,
    {
      isLoading: deleteTaskLoading,
      isError: deleteTaskIsError,
      error: deleteTaskError,
    },
  ] = useDeleteTaskMutation();

  /* marking a task complete or incomplete */
  const handleTaskCompletion = async () => {
    try {
      if (!todo.completed) {
        // If the task is incomplete, mark it as complete
        await markComplete({ todoId: todo._id });
      } else {
        // If the task is already completed, mark it as incomplete
        await markIncomplete({ todoId: todo._id });
      }
    } catch (error) {
      // Handle the error here
      console.error('Error completing/incompleting task:', error.message);

      // Display toast notification for the error
      toast.error('An error occurred while completing/incompleting the task.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000, // Set the auto-close time for the toast notification in milliseconds
      });
    }
  };

  const handleEditTask = () => {
    setEditTask(!editTask);
  };

  return (
    <div
      className={`flex items-center my-2 mx-2.5 px-4 py-2 rounded overflow-hidden border shadow-sm hover:border-indigo-600 hover:bg-indigo-50 transition ease-in 
      ${
        todo.completed
          ? 'border-indigo-600 bg-indigo-50'
          : 'border-stone-300 bg-slate-100'
      }`}
    >
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={handleTaskCompletion}
        className='rounded appearance-none border-1 border-indigo-600 checked:bg-indigo-600 checked:focus:bg-indigo-600 checked:hover:bg-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 mr-2 transition ease-in duration-200'
      />
      {editTask ? (
        <EditTaskForm
          task={todo}
          setEditTask={setEditTask}
          editTask={editTask}
        />
      ) : (
        <p className='text-[#3C486B] text-md font-bold tracking-tight cursor-pointer'>
          {todo.todo}
        </p>
      )}

      <div className='ml-auto flex space-x-3'>
        <FaPenToSquare
          onClick={handleEditTask}
          className='text-indigo-400 hover:text-indigo-700 transition ease-in cursor-pointer'
        />
        <FaRegTrashCan
          onClick={() => deleteTask(todo._id)}
          className='text-indigo-400 hover:text-indigo-700 transition ease-in cursor-pointer'
        />
      </div>
    </div>
  );
};

export default ShowTodos;
