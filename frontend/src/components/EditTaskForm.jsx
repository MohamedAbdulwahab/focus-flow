import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useUpdateTaskTitleMutation } from '../store/apiSlices/todosApiSlice';
import { toast } from 'react-toastify';

const EditTaskForm = ({ task, editTask }) => {
  /* state to track the updated task title */
  const [newTaskTitle, setNewTaskTitle] = useState(task.todo);

  /* get the token from local storage */
  const token = localStorage.getItem('token');

  /* update task title */
  const [updateTaskTitle] = useUpdateTaskTitleMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // update task in the database
      const { data } = await updateTaskTitle({
        token,
        taskId: task._id,
        newTaskTitle: newTaskTitle,
      });
      // close the form
      editTask(false);

      if (data.message === 'Todo updated successfully') {
        // toast success message
        toast.success('task updated successfully');
      }
    } catch (error) {
      toast.error('An error has occured');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex flex-row w-full'>
      <div className='relative w-full border-2 rounded'>
        <input
          type='text'
          className='block w-full border-0 rounded py-1.5 pl-4 pr-12 text-gray-900 shadow-sm placeholder:text-gray-400 ring-2 ring-inset ring-indigo-400 transition ease-in focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button
          className='absolute right-0 top-0 bottom-0 px-3 rounded-r bg-indigo-600 hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none'
          data-ripple-light='true'
        >
          <BiCheck className='text-white text-lg' />
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
