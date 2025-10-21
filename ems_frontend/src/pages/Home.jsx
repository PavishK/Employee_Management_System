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
  const [userID, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // smoother state

  const apiUrl = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const body = {
            username: currentUser.displayName,
            email: currentUser.email,
            imageUrl: currentUser.photoURL,
          };

          const res = await axios.post(`${apiUrl}/api/user/save-signin-data`, body);
          setUserId(res.data.user.id);

          // small delay only for smoother UX
          setTimeout(() => {
            navigate(`/user/dashboard/${res.data.user.id}`);
          }, 500);

          toast.success(res.data.message);
        } catch (error) {
          console.error(error);
          toast.error("Login failed. Please try again.");
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, apiUrl]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login successful!");
      // navigation handled automatically by onAuthStateChanged
    } catch (error) {
      console.error(error);
      toast.error("Unable to login with Google!");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

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