import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseRole from "./components/ChooseRole";
import AdminLogin from "./components/Admin_Panel/LoginForm";
import UserLogin from "./components/User_Panel/LoginForm";
import AdminSignup from "./components/Admin_Panel/SignupForm";
import UserSignup from "./components/User_Panel/SignupForm";
import AdminPanel from "./components/Admin_Panel/AdminPanel";
import FileUpload from "./components/User_Panel/FileUpload";

const App = () => {
  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<ChooseRole />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/admin-signup" element={<AdminSignup />} />
                <Route path="/user-signup" element={<UserSignup />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/file-upload" element={<FileUpload />} />


            </Routes>
      </Router>
    </>
  );
};

export default App;
