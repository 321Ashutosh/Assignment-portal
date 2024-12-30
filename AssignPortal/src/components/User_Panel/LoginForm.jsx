import axios from "axios";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../CustomAlert";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationShown, setNotificationShown] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const navigate = useNavigate(); 

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/users/login";
      const data = {
        "username":username,
        "password": password
      }
      const res = await axios.post(url,data);
      console.log(res.data);
      localStorage.setItem("user",JSON.stringify(res.data));
      navigate("/file-upload"); 
      
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
      {notificationShown && <CustomAlert message={notificationMessage} onClose={()=>setNotificationShown(false)}/>}


      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Login to Your Account - USER</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div>
            <label className="block mb-1 font-bold text-gray-500">Username</label>
            <input
              type="text"
              autoComplete="off"  
              spellCheck="false" 
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

         
          <div>
            <label className="block mb-1 font-bold text-gray-500">Password</label>
            <input
              type="password"
              autoComplete="off"  
              spellCheck="false"  
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

          
          <div className="flex items-center">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">
              Remember Me
            </label>
          </div>

          
          <button
            type="submit"
            className="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300"
          >
            Login
          </button>
        </form>

      
        <p className="text-center mt-4 text-sm text-gray-700">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/user-signup")}
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
