import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function Home() {
    const [count, setCount] = useState(0);
    const { darkMode } = useContext(DarkModeContext);

    const fetchCount = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:8060/student/count");
            setCount(res.data.count);
        } catch (err) {
            console.error("Error from server:", err);
        }
    }, []);

    useEffect(() => {
        fetchCount();
    }, [fetchCount]);

    return (
        <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} overflow-hidden`}>
            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Student Management System
            </h1>
            <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Empowering education through efficient management
            </p>
            <div className="flex flex-col items-center mb-8">
                <Link to="/all-students" className="text-center">
                    <div className={`shadow-lg rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <CountUp
                            className={`text-5xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                            end={count}
                            duration={.1}
                            separator=","
                        />
                        <span className={`block mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Total Students
                        </span>
                    </div>
                </Link>
            </div>
            <div className="flex space-x-4">
                <Link to="/all-students" className={`py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}>
                    View All Students
                </Link>
                <Link to="/add" className={`py-2 px-4 rounded hover:bg-green-600 transition duration-300 ${darkMode ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}>
                    Create New Student
                </Link>
            </div>
        </div>
    );
}
