import { IoIosTimer } from 'react-icons/io';
import { Link } from 'react-router-dom';

const NavigationBar = ({ navigateTo }) => {
  return (
    <ul className='flex w-full flex-wrap items-center justify-around gap-y-6 gap-x-6 bg-red-600'>
      <Link
        to={navigateTo}
        className='flex justify-center items-center bg-red-500 w-1/3 py-2 px-2.5 rounded'
      >
        <IoIosTimer className='text-3xl' />
      </Link>

      <Link
        to={'/timer'}
        className='flex justify-center items-center bg-red-300 w-1/3 py-2 px-2.5 rounded'
      >
        <IoIosTimer className='text-3xl' />
      </Link>
    </ul>
  );
};

export default NavigationBar;
