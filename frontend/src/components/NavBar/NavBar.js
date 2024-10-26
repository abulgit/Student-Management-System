import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();

    return (
        <nav className={`fixed top-0 left-0 right-0 z-10 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-blue-500'}`}>
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link className={`text-2xl font-semibold ${darkMode ? 'text-gray-200' : 'text-white'}`} to={isAuthenticated ? '/home' : '/'}>
                    SMS
                </Link>
                <div className="flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link className={`${darkMode ? 'text-gray-200' : 'text-white'} hover:text-gray-300 transition-colors duration-300`} to="/home">Home</Link>
                                </li>
                                <li>
                                    <Link className={`${darkMode ? 'text-gray-200' : 'text-white'} hover:text-gray-300 transition-colors duration-300`} to="/add">Add Student</Link>
                                </li>
                                <li>
                                    <Link className={`${darkMode ? 'text-gray-200' : 'text-white'} hover:text-gray-300 transition-colors duration-300`} to="/all-students">All Students</Link>
                                </li>
                                <li>
                                    <button className={`${darkMode ? 'text-gray-200' : 'text-white'} hover:text-gray-300 transition-colors duration-300`} onClick={() => {
                                        logout();
                                        navigate('/');
                                    }}>Logout</button>
                                </li>
                            </>
                        ) : null}
                        <li>
                            <button onClick={toggleDarkMode} className={`${darkMode ? 'text-gray-200' : 'text-white'} hover:text-gray-300 transition-colors duration-300`}>
                                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
