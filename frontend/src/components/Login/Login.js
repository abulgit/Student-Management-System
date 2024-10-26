import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { DarkModeContext } from '../contexts/DarkModeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8060/auth/login', { email, password });
      localStorage.setItem('token', response.data.jwtToken);
      setIsAuthenticated(true);
      setUser({ email: response.data.email, name: response.data.name });
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      alert('Login failed: ' + error.response.data.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md">
        <div className={`shadow-md rounded-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-mono font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome to Student Management System</h2>
          <h2 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email:
              </label>
              <input
                type="email"
                className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password:
              </label>
              <input
                type="password"
                className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <button onClick={() => navigate('/signup')} className="text-blue-500 hover:underline">
              Don't have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
