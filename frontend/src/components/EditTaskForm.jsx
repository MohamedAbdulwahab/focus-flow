import { useState } from 'react';
import { useUpdateTaskTitleMutation } from '../store/apiSlices/todosApiSlice';

const EditTaskForm = ({ task, editTask, setEditTask }) => {
  /* state to track the updated task title */
  const [newTaskTitle, setNewTaskTitle] = useState(task.todo);

  /* update task title */
  const [
    updateTaskTitle,
    {
      isLoading: updateTaskTitleIsLoading,
      isError: updateTaskTitleIsError,
      error: updateTaskTitleError,
    },
  ] = useUpdateTaskTitleMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTaskTitle({ taskId: task._id, newTaskTitle: newTaskTitle });
      setEditTask(false);
    } catch (error) {
      console.log(`error: ${error}` || `error: ${updateTaskTitleIsError}`);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type='text'
        className='w-full h-8 rounded mr-2'
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};

export default EditTaskForm;
