import { useSelector } from 'react-redux';
import ShowTodos from '../components/ShowTodos';
import TasksCard from '../components/TasksCard';
import TasksTimer from '../components/TasksTimer';
import Spinner from '../components/Spinner';
import { useGetTodosQuery } from '../store/apiSlices/todosApiSlice';

const Todos = () => {
  /* get currentUser information */
  const { currentUser } = useSelector((state) => state.auth);

  /* get the token from local storage */
  const token = localStorage.getItem('token');

  /* get all tasks */
  const { data, isLoading, isError, error } = useGetTodosQuery({
    userId: currentUser._id,
    token,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-96'>
        <Spinner height='h-10' width='w-10' color='text-indigo-700' />
      </div>
    );
  } else if (isError) {
    return `Session Expired: ${JSON.stringify(error.data)}`;
  }

  let renderTodos = null;
  if (data === 'Todos list is empty') {
    renderTodos = (
      <div className='mx-12 rounded my-10'>
        <p className='text-sm md:text-md lg:text-lg text-center text-[#3C486B]'>
          Whoops, your tasks list is empty..
        </p>
      </div>
    );
  } else {
    renderTodos = data.todos.map((todo) => {
      return <ShowTodos key={todo._id} todo={todo} />;
    });
  }

  return (
    <main className='flex flex-col items-center justify-center bg-slate-100'>
      <div className='flex flex-col items-center space-y-6 w-full mx-auto px-4 mb-5'>
        <TasksTimer />
        <TasksCard renderTodos={renderTodos} />
      </div>
    </main>
  );
};

export default Todos;
