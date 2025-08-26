import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ems-website-ff25b.firebaseapp.com",
  projectId: "ems-website-ff25b",
  storageBucket: "ems-website-ff25b.firebasestorage.app",
  messagingSenderId: "621324757286",
  appId: "1:621324757286:web:be67fd2f53c1269b1b39e7",
  measurementId: "G-FQSFEG1F52"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider=new GoogleAuthProvider();