import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE,
  messagingSenderId: import.meta.env.VITE_MESSAGIN,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// <------ Services ------>

// Auth

const auth = getAuth(app)

// Database

export const db = getFirestore(app)

// Storage


// Login

export const onSignIn = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res
  } catch (error) {
    console.log(error)
  }
}

// Register

export const signUp = async ({ email, password }) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    return res
  } catch (error) {
    console.log(error)
  }
}

// Logout

export const logout = () => {
  signOut(auth)
}

// Google Login

const googleProvider = new GoogleAuthProvider()

export const googleLogin = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    return res
  } catch (error) {
    console.log(error)
  }
}

// Forgot Password

export const forgotPassword = async (email) => {
  try {
    const res = await sendPasswordResetEmail(auth, email)
    return res
  } catch (error) {
    console.log(error)
  }
}
