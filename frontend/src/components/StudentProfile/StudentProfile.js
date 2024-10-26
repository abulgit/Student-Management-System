import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const { darkMode } = useContext(DarkModeContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudent = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8060/student/get/${id}`);
      setStudent(res.data.user);
      setUpdatedStudent(res.data.user);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching student:", err);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent({
      ...updatedStudent,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8060/student/update/${id}`,
        updatedStudent
      );
      console.log("Student updated successfully:", res.data);
      alert("Student updated successfully");
      fetchStudent();
      setShowModal(false);
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8060/student/delete/${id}`);
        console.log("Student deleted successfully");
        alert("Student deleted successfully");
        navigate("/all-students");
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    }
  };

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} animate-pulse`}>
                  Loading...
                </h2>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
              >
                <div className={`shadow-md rounded-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-2xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Student Profile
                  </h2>
                  <div className="space-y-4">
                    {["firstName", "lastName", "rollNumber", "deptName", "regNumber", "year", "age", "gender", "contactNumber", "address"].map(
                      (field, index) => (
                        <div className="flex" key={index}>
                          <label className={`w-1/4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1") + ":"}
                          </label>
                          <div className={`w-3/4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student[field]}</div>
                        </div>
                      )
                    )}
                    <div className="flex justify-end space-x-2 mt-6">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={handleDelete}
                      >
                        Delete Profile
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={() => setShowModal(true)}
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className={`rounded-lg p-8 w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Update Student Profile
            </h2>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
              {["firstName", "lastName", "rollNumber", "deptName", "year", "age", "gender", "address", "contactNumber"].map(
                (field, index) => (
                  <div key={index} className="col-span-2 sm:col-span-1">
                    <label htmlFor={field} className={`block font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1") + ":"}
                    </label>
                    {field === "gender" ? (
                      <select
                        className={`w-full border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                        id={field}
                        name={field}
                        value={updatedStudent[field] || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <input
                        type={field === "age" ? "number" : "text"}
                        className={`w-full border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                        id={field}
                        placeholder={`Enter Student ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        name={field}
                        value={updatedStudent[field] || ""}
                        onChange={handleInputChange}
                        disabled={field === "regNumber"}
                      />
                    )}
                  </div>
                )
              )}
              <div className="col-span-2 flex justify-end space-x-2 mt-6">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
