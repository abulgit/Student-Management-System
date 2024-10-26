import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../contexts/DarkModeContext';

export default function MainLanding() {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext); 

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome to the Portal</h1>
      <div className="flex space-x-4">
        <button
          className={`bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 ${darkMode ? 'bg-blue-700' : 'bg-blue-500'}`}
          onClick={() => navigate('/student-login')}
        >
          Are you a Student?
        </button>
        <button
          className={`bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 ${darkMode ? 'bg-green-700' : 'bg-green-500'}`}
          onClick={() => navigate('/login')}
        >
          Are you a Teacher?
        </button>
      </div>
    </div>
  );
}
