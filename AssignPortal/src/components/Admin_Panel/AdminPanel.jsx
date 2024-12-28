import axios from 'axios';
import  { useEffect, useState } from 'react';
import CustomAlert from '../CustomAlert';
import { FaFile } from 'react-icons/fa';
import ImageModal from './ImageModal';

function AdminPanel() {
  const [notificationShown, setNotificationShown] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [openModal,setOpenModal] = useState(false);
  const [assignment,setAssignment] = useState();
  const [url,setUrl] = useState("")
  
const fetchAssignments =async ()=>{
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        const url = "http://localhost:5000/api/admin/"+user.id
        const res = await axios.get(url);
        setAssignment(res.data.assignment)        
    } catch (error) {
        console.log(error);
    }
}

const acceptAssignment = async (id)=>{
  try {
    const url ="http://localhost:5000/api/admin/accept/"+id;
    const res = await axios.put(url); 
    console.log(res);
    setNotificationShown(true);
    setNotificationMessage("Assignment accepted")
    fetchAssignments();
  } catch (error) {
      console.log(error);
      setNotificationShown(true);
      setNotificationMessage("Something went wrong")
  }
}
const rejectAssignment = async (id)=>{
  try {
    const url ="http://localhost:5000/api/admin/reject/"+id;
    const res = await axios.put(url); 
    console.log(res);
    fetchAssignments();
    setNotificationShown(true);
    setNotificationMessage("Assignment rejected")
  } catch (error) {
      console.log(error);
      setNotificationShown(true);
      setNotificationMessage("Something went wrong")
  }
}
const openFileInNewTab = (url) => {
  // Check if a tab is already open with the URL (simple check for this example)
  const newTab = window.open("http://localhost:5000/"+url, '_blank');
  if (!newTab) {
    console.error('Failed to open new tab');
  }
};

const openAssignment = (assignment) => {
  console.log(assignment.split("."));
  const extension = assignment.split(".")[1];
  if(extension === "pdf"){
    openFileInNewTab(assignment)
    return;
  }else{
    setUrl(assignment);
    setOpenModal(true);
  }
  
}

useEffect(()=>{
    fetchAssignments()
},[])
  return (
    <div className="p-8  min-h-screen bg-blue-400">
      {notificationShown && <CustomAlert message={notificationMessage} onClose={()=>setNotificationShown(false)}/>}
      <ImageModal isOpen={openModal} onClose={()=>setOpenModal(false)} imageUrl={url}/>
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="overflow-x-auto ">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">USER ID</th>
              <th className="px-4 py-2 text-left">USERNAME</th>
              <th className="px-4 py-2 text-left">VIEW ASSIGNMENT</th>
              <th className="px-4 py-2 text-left">ASSIGNMENT Status</th>
              <th className="px-4 py-2 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              assignment?.length === 0 && <tr><td>No Assignment Found for this admin</td></tr>
            }
            {
              assignment?.map((a)=>{                
                return( <tr className="border-t"key={a._id}>
                <td className="px-4 py-2">{a?.userId?.userId}</td>
                <td className="px-4 py-2">{a?.userId?.username}</td>
                <td className="px-4 py-2 cursor-pointer"><FaFile onClick={()=>{openAssignment(a.task)}}/></td>
                <td className="px-4 py-2">{a?.status}</td>
                <td className="px-4 py-2 text-center">
                    {a.status === "Pending" ? (
                      <>
                        <button 
                          onClick={() => acceptAssignment(a._id)} 
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none mr-2"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => rejectAssignment(a._id)} 
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                        >
                          Reject
                        </button>
                      </>
                    ) : a.status === "Accepted" ? (
                      <button 
                        onClick={() => rejectAssignment(a._id)} 
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                      >
                        Reject
                      </button>
                    ) : a.status === "Rejected" ? (
                      <button 
                        onClick={() => acceptAssignment(a._id)} 
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                      >
                        Accept
                      </button>
                    ) : null}
                  </td>
              </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
