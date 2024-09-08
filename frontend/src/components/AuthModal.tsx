import React from "react";
import { Link } from "react-router-dom";

const AuthModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="mb-4">You need to be logged in to access this page.</p>
        <div className="flex justify-end space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
