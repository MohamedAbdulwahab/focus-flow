import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCredentials } from '../store/slices/authSlice';
import { logout } from '../../firebase-config';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  /* get current user info from the global auth state */
  const { currentUser } = useSelector((state) => state.auth);

  /* init dispatch */
  const dispatch = useDispatch();

  /* log user out and clear data from firebase and global state */
  const logOutAndClear = () => {
    /* clear user info from local storage */
    localStorage.removeItem('token');
    /* clear user credentials from the global state */
    dispatch(clearCredentials());
    /* logout from firebase */
    logout();
  };

  return (
    <Disclosure as='nav' className='bg-slate-100'>
      {() => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='items-center'>
                {/* logo */}
                <Link to={currentUser ? '/todos' : '/'}>
                  <span className='font-semibold text-xl tracking-tight text-indigo-600 ml-2 md:ml-0'>
                    Focus Flow
                  </span>
                </Link>
              </div>

              <div className='absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                {currentUser ? (
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex items-center rounded pl-3 pr-2 py-2 mr-2 md:mr-0 text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 border-stone-300 shadow-lg hover:border-indigo-600 hover:bg-indigo-50 transition ease-in'>
                        <span className='sr-only'>Open user menu</span>
                        <p className='text-indigo-900 pr-2'>
                          {currentUser.userName}
                        </p>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='profile'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/'
                              onClick={logOutAndClear}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link to='/register'>
                    <button className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                      Register
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {currentUser && <hr className='my-4' />}
        </>
      )}
    </Disclosure>
  );
};

export default Header;
