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

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE,
  messagingSenderId: import.meta.env.VITE_MESSAGIN,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// <------ Services ------>

// Auth

const auth = getAuth(app)

// Database

export const db = getFirestore(app)

// Storage
const storage = getStorage(app)


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

let googleProvider = new GoogleAuthProvider()

export const googleLogin = async () => {
  try {
    let res = await signInWithPopup(auth, googleProvider)
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

// Storage

export const uploadFile = async (file)=>{
  const storageRef = ref( storage, v4() )
  await uploadBytes(storageRef, file)
  let url = await getDownloadURL(storageRef)
  return url
}
