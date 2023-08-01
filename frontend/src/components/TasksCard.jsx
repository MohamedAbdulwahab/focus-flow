import { useState } from 'react';
import Switcher from './Switcher';
import { useCreateTodoMutation } from '../store/apiSlices/todosApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const TasksCard = ({ renderTodos }) => {
  /* state to add a new task */
  const [newTask, setNewTask] = useState('');

  /* get the token from local storage */
  const token = localStorage.getItem('token');

  /* state to show or hide task list */
  const [showTasksList, setShowTasksList] = useState(true);

  /* current user global state */
  const currentUser = useSelector((state) => state.auth.currentUser);

  /* create a single task */
  const [createTask, { isLoading: createTaskLoading }] =
    useCreateTodoMutation();

  const handleAddNewTodo = async (e) => {
    e.preventDefault();

    try {
      // create a new task in the database.
      const { data } = await createTask({
        token,
        userId: currentUser._id,
        todo: newTask,
      });
      // clear input value
      setNewTask('');
      if (data.message === 'Todo created successfully') {
        toast.success('Task created successfully');
      }
    } catch (err) {
      toast.error('An error occured');
    }
  };

  return (
    <>
      {/* title  */}
      <section className='flex min-h-full w-full flex-1 flex-col justify-center mt-6 pt-2 max-w-sm rounded overflow-hidden shadow-lg'>
        <div
          className='flex items-center justify-center bg-indigo-600 opacity-90 rounded-t py-1 cursor-pointer'
          onClick={() => setShowTasksList(!showTasksList)}
        >
          <ul className='flex justify-between items-center w-full space-x-2 mx-3'>
            <h3 className='text-lg font-bold tracking-tight text-white'>
              Tasks
            </h3>
            <Switcher toggler={showTasksList} />
          </ul>
        </div>

        {showTasksList ? (
          <>
            <div className='mt-3 sm:mx-auto sm:w-full sm:max-w-sm'>
              <h3>{renderTodos}</h3>
            </div>

            <section className='flex justify-center items-center mt-4 pb-4'>
              {/* add new todo form input  */}
              <form className='w-full mx-2' onSubmit={handleAddNewTodo}>
                <div className='relative border-2 rounded border-slate-100'>
                  <input
                    id='todo'
                    name='todo'
                    type='text'
                    autoComplete='todo'
                    placeholder='Add a new task'
                    required
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className='block w-full border-0 rounded py-1.5 pl-4 pr-12 text-gray-900 shadow-sm placeholder:text-gray-400 ring-2 ring-inset ring-indigo-400 transition ease-in focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {/* add new todo button  */}
                  <button
                    type='submit'
                    className='absolute right-0 top-0 bottom-0 px-3 rounded-r bg-indigo-600 hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none'
                  >
                    <svg
                      viewBox='0 0 20 20'
                      enableBackground='new 0 0 20 20'
                      className='w-6 h-6 inline-block text-white'
                    >
                      <path
                        fill='#FFFFFF'
                        d='M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                        C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                        C15.952,9,16,9.447,16,10z'
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : null}
      </section>
    </>
  );
};

export default TasksCard;
