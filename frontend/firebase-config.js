import { initializeApp } from 'firebase/app';
import { toast } from 'react-toastify';

/*********************************/
/*       Firebase Config         */
/*********************************/
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  updateEmail,
  updatePassword,
  signOut,
} from 'firebase/auth';

/* Web app's Firebase configuration */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/*********************************/
/* Register and Login functions  */
/*********************************/

/* register: allow users to register a new account (with email and password) */
const register = async (email, password, userName) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      userName
    );
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });
    // TODO: change to toast
    console.log(user);
  } catch (err) {
    // TODO: change to toast
    console.log(err.message);
  }
};

/* login: allow users to login (with email and password) */
const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    if (err.code === 'auth/wrong-password') {
      toast.error('Invalid Email or Password');
    } else if (err.code === 'auth/user-not-found') {
      toast.error('User not found');
    } else {
      toast.error('An error occurred');
    }
  }
};

// Google provider
const provider = new GoogleAuthProvider();

/* signInWithGoogle: allow users to sign-in with Google */
const signInWithGoogle = async () => {
  try {
    const user = await signInWithPopup(auth, provider);
    return user;
  } catch (err) {
    // TODO: change to toast
    console.log(err.message);
  }
};

const fireBaseUpdateDisplayName = async (newDisplayName) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    });
  } catch (err) {
    console.log(`Error updating display name: ${err.message}`);
  }
};

const fireBaseUpdateEmailAddress = async (newEmail) => {
  try {
    await updateEmail(auth.currentUser, newEmail);
  } catch (err) {
    console.log(`Error updating email: ${err.message}`);
  }
};

const fireBaseUpdatePassword = async (newPassword) => {
  try {
    await updatePassword(auth.currentUser, newPassword);
  } catch (err) {
    console.log(`Error updating password: ${err.message}`);
  }
};

/* logout: allow users to logout */
const logout = async () => {
  await signOut(auth);
};

export {
  register,
  login,
  signInWithGoogle,
  fireBaseUpdateDisplayName,
  fireBaseUpdateEmailAddress,
  fireBaseUpdatePassword,
  logout,
};
