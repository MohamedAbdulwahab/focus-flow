import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { setCredentials } from '../store/slices/authSlice';
import {
  auth,
  register,
  login,
  signInWithGoogle,
  logout,
} from '../../firebase-config';
import { Link } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get the JSON Web Token (JWT)
        const token = await currentUser.getIdToken();

        // store token in local storage
        localStorage.setItem('token', token);

        const { email, displayName, uid } = currentUser;
        dispatch(
          setCredentials({
            email: email,
            displayName: displayName,
            _id: uid,
          })
        );
      } else {
        dispatch(setCredentials(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const logOutAndClear = () => {
    localStorage.removeItem('token');
    logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* login  */}
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Login</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group id='login-email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email address'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id='login-password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              className='w-100 mt-3'
              type='submit'
              onClick={() => login(email, password)}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <button onClick={signInWithGoogle}>login with Google</button>

      <button onClick={logOutAndClear}>Log Out</button>

      <button>
        <Link to='/todos'>ToDos</Link>
      </button>

      <h3>
        {currentUser?.email
          ? `Welcome, ${currentUser.email}`
          : 'Welcome, Guest!'}
      </h3>
    </>
  );
}
