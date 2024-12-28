const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userAuth");
const assignmentRoute = require("./routes/assignmentRoute")

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("uploads"))

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL
console.log(mongoUrl);

mongoose.connect(mongoUrl).then(()=>{
  console.log("Database Connected");
}).catch((error)=>{
  console.log("Error: " + error);
})

// Routes
app.use("/api/users", userRoutes);
app.use("/api",assignmentRoute)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));