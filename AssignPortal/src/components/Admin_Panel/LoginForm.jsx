

import axios from "axios";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import CustomAlert from "../CustomAlert";

const LoginForm = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
 const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationShown, setNotificationShown] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/users/login";
      const data = {
        "username":username,
        "password": password
      }
      const res = await axios.post(url,data);
      console.log(res);
      localStorage.setItem("user",JSON.stringify(res.data));
      navigate("/admin-panel"); // Redirect to file upload page after login
      
    } catch (error) {
      if(error.response.data.message ==="Invalid credentials"){
        setNotificationShown(true);
        setNotificationMessage("Invalid credentials");
      }
      if(error.response.data.message ==="User not found"){
        setNotificationMessage("User not found");
        setNotificationShown(true);
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400">
      {/* Login Form */}
      {notificationShown && <CustomAlert message={notificationMessage} onClose={()=>setNotificationShown(false)}/>}

      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Login to Your Account - ADMIN</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* User ID Field */}
          <div>
            <label className="block mb-1 font-bold text-gray-500">User ID</label>
            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Enter your unique user ID"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-bold text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button className="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">
            Login
          </button>
        </form>

        {/* Link to Sign Up */}
        <p className="text-center mt-4 text-sm text-gray-700">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/admin-signup")}
            className="text-blue-500 hover:underline"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
