import React, { useState, useRef, useEffect } from "react";

function ProfileMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={`https://ui-avatars.com/api/?name=${user.displayName}&background=random&bold=true&font-size=0.5`}
        alt={user?.displayName || "User"}
        className="w-10 h-10 rounded-full cursor-pointer border"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg p-4 z-50">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {user?.displayName || "No Name"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.email || "No Email"}
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-white bg-red-600 rounded-xl hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;