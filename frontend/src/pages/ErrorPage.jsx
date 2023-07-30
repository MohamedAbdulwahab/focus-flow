import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className='flex flex-col justify-center items-center h-96'>
      <p className='inline text-5xl md:text-7xl tracking-tight font-serif text-indigo-600'>
        Whoops
      </p>
      <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-gray-500 font-serif my-5'>
        Page <p className='inline text-gray-600'>Does Not</p> Exist
      </h1>
      <Link to='/todos'>
        <button className='h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-600 rounded-lg focus:shadow-outline hover:bg-indigo-800 animate-pulse'>
          Back to Main
        </button>
      </Link>
    </section>
  );
};

export default ErrorPage;
