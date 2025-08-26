import React from 'react';

function LogOutComponent({onClickCancel}) {

  const handleLogout = () => {
    console.log("User logged out");
    onClickCancel();
  };
  return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition">
                Logout
              </button>
              <button
                onClick={onClickCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl shadow-md hover:bg-gray-400 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}

export default LogOutComponent