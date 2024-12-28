const express = require("express");
const { uploadAssignment, getAdmins, viewAssignment, rejectAssignment, acceptAssignment } = require("../controller/assignment");
const upload = require("../middleware/assignmentUploadMIddleware");

const router = express.Router();

router.post("/upload",upload.single("file"),uploadAssignment)
router.get('/admins', getAdmins);
router.get('/admin/:adminId', viewAssignment);
router.put('/admin/reject/:assignmentId', rejectAssignment);
router.put('/admin/accept/:assignmentId', acceptAssignment);


module.exports = router;