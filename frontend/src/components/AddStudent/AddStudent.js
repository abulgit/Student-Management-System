import React, { useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function AddStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rollNumber, setRollNumber] = useState(""); 
  const [deptName, setDeptName] = useState(""); 
  const [regNumber, setRegNumber] = useState("");
  const [year, setYear] = useState(""); 
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const { darkMode } = useContext(DarkModeContext); 

  function sendData(event) {
    event.preventDefault();

    const newStudent = {
      firstName,
      lastName,
      rollNumber, 
      deptName,   
      regNumber,
      year,       
      age,
      gender,
      address,
      contactNumber,
    };

    axios
      .post("http://localhost:8060/student/add", newStudent)
      .then(() => {
        alert("Student Added");
        setFirstName("");
        setLastName("");
        setRollNumber("");
        setDeptName(""); 
        setRegNumber("");
        setYear(""); 
        setAge("");
        setGender("");
        setAddress("");
        setContactNumber("");
      })
      .catch((err) => {
        console.error("Error from server:", err);
        alert(
          "An error occurred while adding the student: " +
            err.response.data.message
        );
      });
  }

  return (
    <div className={`min-h-screen px-4 mx-auto pt-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-full max-w-2xl">
          <div className={`shadow-md mt-20 rounded-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-2xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Add New Student
            </h3>
            <form className="space-y-6" onSubmit={sendData}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    First Name:
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="firstName"
                    placeholder="Enter Student Name"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="lastName"
                    placeholder="Enter Student Name"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="rollNumber"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Roll Number:
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="rollNumber"
                    placeholder="Enter Roll Number"
                    value={rollNumber}
                    onChange={(event) => {
                      setRollNumber(event.target.value);
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="deptName"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Department Name:
                  </label>
                  <select
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="deptName"
                    value={deptName}
                    onChange={(event) => {
                      setDeptName(event.target.value);
                    }}
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="CSE">CSE</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="regNumber"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Student Registration Number:
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="regNumber"
                    placeholder="Enter Student Registration Number"
                    value={regNumber}
                    onChange={(event) => {
                      setRegNumber(event.target.value);
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Year:
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="year"
                    placeholder="Enter Year"
                    value={year}
                    onChange={(event) => {
                      setYear(event.target.value);
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Student Age:
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="age"
                    placeholder="Enter Student Age"
                    value={age}
                    onChange={(event) => {
                      setAge(event.target.value);
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Select Student Gender:
                  </label>
                  <select
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Address:
                  </label>
                  <textarea
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="address"
                    placeholder="Enter Student Address"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactNumber"
                    className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Student Contact Number:
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2`}
                    id="contactNumber"
                    placeholder="Enter Student Contact Number"
                    value={contactNumber}
                    onChange={(event) => {
                      setContactNumber(event.target.value);
                    }}
                    required
                  />
                </div>
                
              </div>

              <div className="flex justify-center mt-6"> 
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
