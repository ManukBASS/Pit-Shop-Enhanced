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

const firebaseConfig = {
  apiKey: "AIzaSyCDFr57BDceUmUTjRhzoGO3BM6VsPf8vrU",
  authDomain: "pit-shop-ecommerce.firebaseapp.com",
  projectId: "pit-shop-ecommerce",
  storageBucket: "pit-shop-ecommerce.appspot.com",
  messagingSenderId: "1057728289509",
  appId: "1:1057728289509:web:234872b165f9f2033dd20c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// <--- Services --->

// Auth

const auth = getAuth(app)

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

// Database

// Storage