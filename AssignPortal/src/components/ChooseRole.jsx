import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChooseRole() {
  const navigate = useNavigate();

  return (
    <div className=' bg-blue-500 '>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Assignment Portal and Assignment Details</h1>
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-5 m-4 text-center w-48">
        <h2 className="text-xl font-semibold mb-4">Admin</h2>
        <button 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => navigate('/admin-login')}
        >
          Login
        </button>
      </div>
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-5 m-4 text-center w-48">
        <h2 className="text-xl font-semibold mb-4">User</h2>
        <button 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => navigate('/user-login')}
        >
          Login
        </button>
      </div>
    </div>
    </div>
  );
}

export default ChooseRole;
