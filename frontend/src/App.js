import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AddStudent from "./components/AddStudent/AddStudent";
import AllStudents from "./components/AllStudents/AllStudents";
import StudentProfile from "./components/StudentProfile/StudentProfile";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./components/contexts/AuthContext";
import { DarkModeProvider } from "./components/contexts/DarkModeContext";
import MainLanding from "./components/MainLanding/MainLanding";
import StudentLogin from "./components/StudentLogin/StudentLogin";

function AppContent() {
    const location = useLocation();
    const showNavBar = location.pathname !== "/hello";

    return (
        <div className="App">
            {showNavBar && <NavBar />}
            <Routes>
                <Route path="/" element={<MainLanding />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
                <Route path="/all-students" element={<PrivateRoute><AllStudents /></PrivateRoute>} />
                <Route path="/student-profile/:id" element={<PrivateRoute><StudentProfile /></PrivateRoute>} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}  />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <DarkModeProvider>
                <Router>
                    <AppContent />
                </Router>
            </DarkModeProvider>
        </AuthProvider>
    );
}

export default App;
