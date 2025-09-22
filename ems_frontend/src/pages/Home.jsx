import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../lib/config";
import Loader from "../components/Loader.jsx";
import toast from "react-hot-toast";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userID, setUserId] = useState(0);
  const [makeLoading, setMakeLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {
        setMakeLoading(true);
        setUser(currentUser);
        await loginHandler(currentUser); // pass currentUser directly
      } else {
        setUser(null);
      }
      setMakeLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginHandler = async (currentUser) => {
    if (!currentUser) return;

    setMakeLoading(true);
    try {
      const body = {
        username: currentUser.displayName,
        email: currentUser.email,
        imageUrl: currentUser.photoURL,
      };

      const res = await axios.post(apiUrl + "/api/user/save-signin-data", body);
      setUserId(res.data.user.id);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      await signOut(auth);
      setUser(null);
      toast.error("Login failed. Please try again.");
    } finally {
      setMakeLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMakeLoading(true);
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle loginHandler
      toast.success("Login successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Unable to login with Google!");
      setMakeLoading(false);
    }
  };

  const handleLogout = async () => {
    setMakeLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout!");
    } finally {
      setMakeLoading(false);
    }
  };

  if (makeLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Employee Management System
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto text-lg">
          A simple Employee Management System to add, view, update, and delete
          employee records efficiently.
        </p>

        <div className="space-y-4 w-64 mx-auto">
          {!user ? (
            <button
              onClick={handleGoogleLogin}
              className="flex cursor-pointer items-center justify-center gap-3 w-full px-6 py-3 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>
          ) : (
            <>
              <button
                className="cursor-pointer w-full px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
                onClick={() => navigate(`/user/dashboard/${userID}`)}
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer px-6 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}