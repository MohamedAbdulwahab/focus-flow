import { initializeApp } from 'firebase/app';

/*********************************/
/*       Firebase Config         */
/*********************************/
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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
const register = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
};

/* login: allow users to login (with email and password) */
const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
};

// Google provider
const provider = new GoogleAuthProvider();

/* signInWithGoogle: allow users to sign-in with Google */
const signInWithGoogle = async () => {
  try {
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
};

/* logout: allow users to logout */
const logout = async () => {
  await signOut(auth);
};

export { register, login, signInWithGoogle, logout };
