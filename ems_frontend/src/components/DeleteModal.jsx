import React from "react";

function DeleteModal({ onConfirm, onCancel, employeeName }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold">{employeeName}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl shadow-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
