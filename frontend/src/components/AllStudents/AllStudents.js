import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useContext(DarkModeContext); 

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8060/student/");
        setStudents(res.data);
      } catch (err) {
        console.error("Error from server:", err);
        alert(
          "An error occurred while retrieving the student list: " +
            err.response.data.message
        );
      }
    };
    getStudents();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} pt-16`}>
      <div className={`max-w-7xl mx-auto p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg`}>
        <h3 className={`text-2xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Student Details</h3>
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
            className={`w-full max-w-xs p-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <th className={`p-2 border-b font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Student Name</th>
              <th className={`p-2 border-b font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Reg. Number</th>
              <th className={`p-2 border-b font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gender</th>
              <th className={`p-2 border-b font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Age</th>
              <th className={`p-2 border-b font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Student Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={student._id}
                className={index % 2 === 0 ? (darkMode ? "bg-gray-800" : "bg-gray-50") : ""}
              >
                <td className={`p-2 border-b ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {student.firstName + " " + student.lastName}
                </td>
                <td className={`p-2 border-b ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.regNumber}</td>
                <td className={`p-2 border-b ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.gender}</td>
                <td className={`p-2 border-b ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.age}</td>
                <td className="p-2 border-b text-center">
                  <Link to={`/student-profile/${student._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
