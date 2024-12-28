import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CustomAlert from "../CustomAlert";

function FileUpload() {
  const fileRef = useRef();
  const [file, setFile] = useState();
  const [admins, setAdmins] = useState(null); // State for selected admin
  const [admin, setAdmin] = useState(""); // State for selected admin
    const [notificationShown, setNotificationShown] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState();
  


  const fetchAdmins = async()=>{
    console.log("Api");
    
    try {
      const url = "http://localhost:5000/api/admins";
      const res = await axios.get(url);
      console.log(res.data);
      
      setAdmins(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchAdmins();
  },[])
  
  const uploadAssignment = async() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      const url = "http://localhost:5000/api/upload"
      const formData = new FormData();
      formData.append("file",file);
      formData.append("adminId",admin);
      formData.append("userId",user?.id);
      const res = await axios.post(url,formData);
      console.log(res);
      setNotificationMessage("Assignment upload successfully");
      setNotificationShown(true);
      // Add your file upload logic here
    } catch (error) {
      setNotificationMessage("Failed Assignment upload successfully");
      setNotificationShown(true);
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-500 ">
      {notificationShown && <CustomAlert message={notificationMessage} onClose={()=>setNotificationShown(false)}/>}

        <div className="border border-gray-200 rounded-lg shadow-xl p-8 text-center bg-slate-50">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Upload Your File</h2>
          <p className="text-gray-600 mb-4">Select a file to upload by clicking the button below.</p>
          
          {/* File Input */}
          <input 
            type="file" 
            ref={fileRef} 
            className="hidden" 
            onChange={(e) => setFile(e.target.files[0])} 
          />
          {file && <p className="mb-4">{file.name}</p>}
          
          {/* Dropdown for selecting admin */}
          <select 
            value={admin} 
            onChange={(e) => setAdmin(e.target.value)} 
            className="mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <option value="" disabled>Select Admin</option>
            {admins?.map((a) => (
              <option key={a._id} value={a.userId}>
                {a.username}
              </option>
            ))}
          </select>
          
          {/* Upload button */}
          <button 
            onClick={file && admin ? uploadAssignment : () => fileRef.current.click()} 
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-pink-500 hover:to-purple-500 focus:ring-4 focus:ring-purple-300 transition-all duration-300"
          >
            {file ? (admin ? "Upload Assignment" : "Select Admin") : "Choose File"}
          </button>
        </div>
      </div>
    </>
  );
}

export default FileUpload;
