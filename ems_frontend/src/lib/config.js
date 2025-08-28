import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ems-website-da962.firebaseapp.com",
  projectId: "ems-website-da962",
  storageBucket: "ems-website-da962.firebasestorage.app",
  messagingSenderId: "821870332976",
  appId: "1:821870332976:web:e8aa4984516778d8a5f1f5",
  measurementId: "G-Z6MQHTVYE8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider=new GoogleAuthProvider();