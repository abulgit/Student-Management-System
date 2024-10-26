import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../contexts/DarkModeContext';

export default function StudentLogin() {
  const [regNumber, setRegNumber] = useState('');
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8060/student/login', { regNumber });
      setStudentData(response.data); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md">
        <div className={`shadow-md rounded-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Student Login</h2>
          <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Enter Registration number to See Your Profile.</h3><br/>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="regNumber" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Registration Number:
              </label>
              <input
                type="text"
                className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                id="regNumber"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                Login
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h3 className={`text-xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Student Profile</h3><br/>
            {studentData ? (
              <>
                <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hello, {studentData.firstName}</h3><br/>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name: {studentData.name}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Roll Number: {studentData.rollNumber}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Registration Number: {studentData.regNumber}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department Name: {studentData.deptName}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Passing Year: {studentData.year}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age: {studentData.age}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gender: {studentData.gender}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address: {studentData.address}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact Number: {studentData.contactNumber}</p>
              </>
            ) : (
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No student data available. Please log in to view your profile.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
