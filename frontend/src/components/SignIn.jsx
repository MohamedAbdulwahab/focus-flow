import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, login, signInWithGoogle } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { setCredentials } from '../store/slices/authSlice';
import { useGetUserInfoMutation } from '../store/apiSlices/usersApiSlice';
import { useRegisterMutation } from '../store/apiSlices/usersApiSlice';

const SignIn = () => {
  /* states to track email and passwod */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* init dispatch and navigate hooks */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* get the state of currentUser*/
  const { currentUser } = useSelector((state) => state.auth);

  // call backend api to get user information
  const [getUserInfo, { isLoading: userInfoLoading }] =
    useGetUserInfoMutation();

  const [registerUser] = useRegisterMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/todos';

  // Apostrophe escapre trick.
  const noAccount = "Don't have an account?";

  /* store the Json Web Token (JWT) into local storage */
  useEffect(() => {
    // in case a user is already logged in
    if (currentUser) {
      // redirect to todos page
      navigate(redirect);
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUserInfo) => {
      if (currentUserInfo) {
        // Get the JSON Web Token (JWT)
        const token = await currentUserInfo.getIdToken();

        // store token in local storage
        localStorage.setItem('token', token);
      }
    });

    return unsubscribe;
  }, [currentUser, navigate, redirect]);

  /* email and password login: handle form submission  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // firebase user login.
      const { user } = await login(email, password);
      // get user info from mongodb.
      const currentUserInfo = await getUserInfo({ email: user.email }).unwrap();
      if (currentUserInfo) {
        // set user credentials in the global (currentUser) state.
        dispatch(setCredentials({ ...currentUserInfo }));
        // redirect to todos page
        navigate('/todos');
      } else {
        // currentUserInfo error? set the global (currentUser) state to null.
        dispatch(setCredentials(null));
      }
    } catch (err) {
      //TODO: change console.log() to toast messages.
      // if (err.message.includes('auth/wrong-password')) {
      //   toast.error('Invalid Email or Password');
      // }
      console.log('Something went wrong..');
    }
  };

  const continueWithGoogle = async () => {
    try {
      // login with Google with firebase.
      const { user } = await signInWithGoogle();
      // new user? save to Mongodb. Else, get user info from MongoDB.
      const currentUserInfo = await registerUser({
        firebaseUserId: user.uid,
        userName: user.displayName,
        email: user.email,
      }).unwrap();
      // set the global currentUser state.
      dispatch(setCredentials({ ...currentUserInfo }));
      // redirect to todos page
      navigate('/todos');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center mt-6 px-6 pt-2 pb-3 lg:px-8 max-w-sm rounded overflow-hidden shadow-lg'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        {/* email */}
        <div className='mt-7 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
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
                  className='block text-sm font-medium leading-6 text-gray-900'
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

            {/* sign-in button  */}
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {userInfoLoading ? (
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
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* horizontal line  */}
          <div className='relative flex py-5 items-center'>
            <div className='flex-grow border-t border-gray-400'></div>
            <span className='flex-shrink mx-4 text-gray-400'>OR</span>
            <div className='flex-grow border-t border-gray-400'></div>
          </div>

          {/* login with Google button  */}
          <button
            // TODO: complete this
            onClick={continueWithGoogle}
            className='px-4 py-2 border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 w-full'
          >
            <img
              className='w-6 h-6'
              src='https://www.svgrepo.com/show/475656/google-color.svg'
              loading='lazy'
              alt='google logo'
            />
            <span>Login with Google</span>
          </button>

          <p className='mt-10 text-center text-sm text-gray-500'>
            {noAccount}{' '}
            <Link
              to='/register'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
