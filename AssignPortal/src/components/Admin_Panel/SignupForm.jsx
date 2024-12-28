
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import CustomAlert from "../CustomAlert";

const SignupForm = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [userName,setUserName] = useState();
  const [userPassword,setUserPassword] = useState();
  const [notificationShown, setNotificationShown] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // After the signup form is submitted, redirect to the login page
    try {
      const url = "http://localhost:5000/api/users/register";
      const data = {
          "username":userName,
          "password": userPassword,
          "role":"Admin"
      }
      const res = await axios.post(url,data);
      console.log(res);
      navigate("/admin-login");
    } catch (error) {
      setNotificationShown(true);
      setNotificationMessage("Username already exists");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      {/* Signup Form */}
      {notificationShown && <CustomAlert message={notificationMessage} onClose={()=>setNotificationShown(false)}/>}
      
      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Admin Create Your Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* User ID Field */}
          {/* <div>
            <label className="block mb-1 font-bold text-gray-500">User ID</label>
            <input
              type="text"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              placeholder="Enter your unique user ID"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div> */}

          {/* Username Field */}
          <div>
            <label className="block mb-1 font-bold text-gray-500">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              placeholder="Enter your username"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-bold text-gray-500">Password</label>
            <input
              type="password"
              value={userPassword}
              onChange={(e)=>setUserPassword(e.target.value)}
              placeholder="Enter a strong password"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-center">
            <input type="checkbox" id="agree" />
            <label htmlFor="agree" className="ml-2 text-gray-700 text-sm">
              I agree to the terms and privacy.
            </label>
          </div>

          {/* Submit Button */}
          <button className="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">
            Sign Up
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center mt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/admin-login")}
            className="text-blue-500 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
