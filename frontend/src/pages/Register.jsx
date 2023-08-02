import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setCredentials } from '../store/slices/authSlice';
import { auth, register } from '../../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../store/apiSlices/usersApiSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const [registerUser, { isLoading: loadingRegisterUser }] =
    useRegisterMutation();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      // redirect to todos page
      navigate('/todos');
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // user is logged-in
      if (currentUser) {
        // Get the JSON Web Token (JWT)
        const token = await currentUser.getIdToken();

        // store token in local storage
        localStorage.setItem('token', token);
      } else {
        dispatch(setCredentials(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // register user via firebase
      await register(email, password, userName);

      // save user to Mongodb
      const currentUserInfo = await registerUser({
        firebaseUserId: auth.currentUser.uid,
        userName,
        email,
      }).unwrap();

      if (currentUserInfo) {
        // update the currentUser state with the info recieved from mongodb.
        dispatch(setCredentials({ ...currentUserInfo }));

        // clear all fields
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // navigate to todos page
        navigate('/todos');
      } else {
        dispatch(setCredentials(null));
      }
    } catch (error) {
      // TODO: add toast instead of console.log().
      console.log(error.message);
    }
  };

  return (
    <section className='flex justify-center items-center mt-6 mx-auto'>
      <div className='flex min-h-full flex-1 flex-col justify-center mt-6 px-6 pt-2 pb-3 lg:px-8 max-w-sm rounded overflow-hidden shadow-lg'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create a new account
          </h2>
        </div>

        {/* user name */}
        <div className='mt-7 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='text'
                className='block text-sm font-medium leading-4 text-gray-900'
              >
                User Name
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='Enter User Name'
                  autoComplete='userName'
                  required
                  onChange={(e) => setUserName(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-4 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  placeholder='Enter Email Address'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {/* password  */}
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-4 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'></div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='Enter Password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {/* confirm password  */}
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='confirm-password'
                  className='block text-sm font-medium leading-4 text-gray-900'
                >
                  Confirm Password
                </label>
                <div className='text-sm'></div>
              </div>
              <div className='mt-2'>
                <input
                  id='confirm-password'
                  name='confirm-password'
                  type='password'
                  autoComplete='confirm-current-password'
                  placeholder='Confirm Password'
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {/* register button  */}
            <div>
              <button
                type='submit'
                disabled={loadingRegisterUser}
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {loadingRegisterUser ? (
                  <>
                    <svg
                      className='mr-3 h-5 w-5 animate-spin text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <Link
              to='/'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
