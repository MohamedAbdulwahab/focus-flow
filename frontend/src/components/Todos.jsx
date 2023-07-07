import { useEffect } from 'react';
import { getTodos } from './SecuredApiCalls';
import { Link } from 'react-router-dom';

const Todos = () => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    getTodos(token);
  }, [token]);

  return (
    <div>
      <Link to='/'>
        <button>Go Back</button>
      </Link>
      <h3>Todos</h3>
    </div>
  );
};

export default Todos;
