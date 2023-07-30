import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switcher from '../components/Switcher';
import { BiCheck } from 'react-icons/bi';
import { updateDisplayName, updateEmail } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import {
  fireBaseUpdateDisplayName,
  fireBaseUpdateEmailAddress,
} from '../../firebase-config';
import {
  useUpdateDisplayNameMutation,
  useUpdateEmailMutation,
} from '../store/apiSlices/usersApiSlice';

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState(currentUser.userName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');

  const [showDisplayNameEdit, setShowDisplayNameEdit] = useState(false);
  const [showEmailEdit, setShowEmailEdit] = useState(false);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);

  const [
    updateDisplayNameApi,
    { isLoading: updateDisplayNameLoading, error: updateDisplayNameError },
  ] = useUpdateDisplayNameMutation();

  const [
    updateEmailApi,
    { isLoading: updateEmailLoading, error: updateEmailError },
  ] = useUpdateEmailMutation();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('form submitted');
  };

  const handleUpdateDisplayName = async (e) => {
    e.preventDefault();

    try {
      // update the display name in the database.
      const { data } = await updateDisplayNameApi({
        userId: currentUser._id,
        newDisplayName: displayName,
      });
      // update display name in firebase.
      fireBaseUpdateDisplayName(displayName);
      // update the display name in the global currentUser state.
      dispatch(updateDisplayName(displayName));

      if (data.message === 'Display name updated successfully') {
        // display a toast successmessage
        toast.success('Display name updated successfully');
      }
    } catch (err) {
      // display a toast error message.
      toast.error('An error has occured');
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    try {
      // update the email address in the database.
      const { data } = await updateEmailApi({
        userId: currentUser._id,
        newEmail: email,
      });
      //update email in firebase
      fireBaseUpdateEmailAddress(email);
      // update the email address in the global currentUser state.
      dispatch(updateEmail(email));

      if (data.message === 'Email address updated successfully') {
        toast.success('Email address updated successfully');
      }
    } catch (err) {
      toast.error('An error has occured');
    }
  };

  return (
    <main className='flex justify-center items-center'>
      <section className='flex mx-2 md:mx-0 min-h-full w-full flex-1 flex-col justify-center mt-6 pt-2 max-w-sm rounded overflow-hidden shadow-lg'>
        <div className='flex items-center justify-center bg-indigo-600 opacity-90 rounded-t py-1 cursor-pointer'>
          <div>
            <div className='flex h-full items-center justify-center bg-indigo-600 opacity-90 rounded-t py-1 cursor-pointer'>
              <h3 className='text-lg font-bold tracking-tight text-white'>
                Manage Profile
              </h3>
            </div>
          </div>
        </div>

        <main className='space-y-5 mt-4 mb-5 mx-3'>
          {/* username */}
          <section className='flex flex-col space-y-0'>
            <div
              onClick={() => setShowDisplayNameEdit(!showDisplayNameEdit)}
              className='flex w-full justify-between items-center px-4 py-2 rounded-t overflow-hidden shadow-sm border-stone-300 bg-indigo-600 opacity-90 cursor-pointer'
            >
              <p className='text-white text-sm md:text-md font-bold tracking-tight cursor-pointer'>
                Manage Display Name
              </p>

              <Switcher toggler={showDisplayNameEdit} />
            </div>
            {showDisplayNameEdit ? (
              <section className='shadow-md mt-0 pt-0 rounded-b'>
                <div className='flex justify-center items-center mt-4 pb-4'>
                  {/* Form and button */}
                  <form
                    onSubmit={handleUpdateDisplayName}
                    className='flex flex-row w-full'
                  >
                    <div className='relative w-full border-2 rounded mx-3'>
                      <input
                        type='text'
                        className='block w-full border-0 rounded py-1.5 pl-4 pr-12 text-gray-900 shadow-sm placeholder:text-gray-400 ring-2 ring-inset ring-indigo-400 transition ease-in focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                      <button
                        className='absolute right-0 top-0 bottom-0 px-3 rounded-r bg-indigo-600 hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none'
                        data-ripple-light='true'
                      >
                        <BiCheck className='text-white text-lg' />
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            ) : null}
          </section>

          {/* email */}
          <div
            onClick={() => setShowEmailEdit(!showEmailEdit)}
            className='flex w-full justify-between items-center my-2 px-4 py-2 rounded overflow-hidden border shadow-sm transition ease-in border-stone-300 bg-indigo-600 opacity-90 cursor-pointer'
          >
            <p className='text-white text-sm md:text-md font-bold tracking-tight cursor-pointer'>
              Manage Email
            </p>
            <Switcher toggler={showEmailEdit} />
          </div>
          {showEmailEdit ? (
            <section className='shadow-md mt-0 pt-0 rounded-b'>
              <div className='flex justify-center items-center mt-4 pb-4'>
                {/* Form and button */}
                <form
                  onSubmit={handleUpdateEmail}
                  className='flex flex-row w-full'
                >
                  <div className='relative w-full border-2 rounded mx-3'>
                    <input
                      type='text'
                      className='block w-full border-0 rounded py-1.5 pl-4 pr-12 text-gray-900 shadow-sm placeholder:text-gray-400 ring-2 ring-inset ring-indigo-400 transition ease-in focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className='absolute right-0 top-0 bottom-0 px-3 rounded-r bg-indigo-600 hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none'
                      data-ripple-light='true'
                    >
                      <BiCheck className='text-white text-lg' />
                    </button>
                  </div>
                </form>
              </div>
            </section>
          ) : null}

          {/* password */}
          <div
            onClick={() => setShowPasswordEdit(!showPasswordEdit)}
            className='flex w-full justify-between items-center my-2 px-4 py-2 rounded overflow-hidden border shadow-sm transition ease-in border-stone-300 bg-indigo-600 opacity-90 cursor-pointer'
          >
            <p className='text-white text-sm md:text-md font-bold tracking-tight cursor-pointer'>
              Manage Password
            </p>
            <Switcher toggler={showPasswordEdit} />
          </div>
          {showPasswordEdit ? (
            <section className='shadow-md mt-0 pt-0 rounded-b'>
              <div className='flex justify-center items-center mt-4 pb-4'>
                {/* Form and button */}
                <form
                  onSubmit={handleFormSubmit}
                  className='flex flex-col w-full py-2 px-3 space-y-2 New '
                >
                  <input
                    type='password'
                    placeholder='New Password'
                    className='block w-full border-0 rounded py-1.5 pl-4 pr-12 text-gray-900 shadow-sm placeholder:text-gray-400 ring-2 ring-inset ring-indigo-400 transition ease-in focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type='password'
                    placeholder='Confirm New Password'
                    className='block w-full border-0 rounded py-1.5 pl-4 pr-12 text-gray-900 shadow-sm placeholder:text-gray-400 ring-2 ring-inset ring-indigo-400 transition ease-in focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className='flex items-center justify-center rounded py-2 px-3 bg-indigo-600 hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none'
                    data-ripple-light='true'
                  >
                    <p className='text-white text-sm font-bold'>Submit</p>
                  </button>
                </form>
              </div>
            </section>
          ) : null}
        </main>
      </section>
    </main>
  );
};

export default ProfilePage;
