const Assignments = require("../models/Assignments");
const User = require("../models/User");


exports.uploadAssignment = async(req,res)=>{
    try {
        const {userId,adminId} = req.body;
        const file = req.file.filename;
        const assignment = new Assignments({ adminId: adminId, userId, task:file });
        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully' });
      } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: error.message });
      }
}

exports.viewAssignment = async(req,res) =>{
    try {
        const adminId = req.params.adminId;
        console.log(adminId);
        
        const assignment = await Assignments.find({adminId:adminId}).populate({
            path: 'userId',
            select: '-password -role', // Excludes the password field
        });
        res.status(200).json({ assignment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAdmins = async (req, res) => {
    try {
      const admins = await User.find({ role: 'Admin' }).select('userId username');
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Reject Assignment
  exports.rejectAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params; // Extract assignmentId from request params
  
      // Update assignment status to 'Rejected' and populate userId details
      const updatedAssignment = await Assignments.findByIdAndUpdate(
        assignmentId, // Pass assignmentId directly
        { status: 'Rejected' },
        { new: true } // Return the updated document
      ).populate('userId', 'username role'); // Include user details (username and role)
  
      if (!updatedAssignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
  
      res.json({ message: 'Assignment rejected', assignment: updatedAssignment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  // Accept Assignment
  exports.acceptAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params; // Extract assignmentId from request params
  
      // Update assignment status to 'Accepted' and populate userId details
      const updatedAssignment = await Assignments.findByIdAndUpdate(
        assignmentId, // Pass assignmentId directly
        { status: 'Accepted' },
        { new: true } // Return the updated document
      ).populate('userId', 'username role'); // Include user details (username and role)
  
      if (!updatedAssignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
  
      res.json({ message: 'Assignment accepted', assignment: updatedAssignment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  