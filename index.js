const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const logger= require("./middlewares/logger")

const app = express();

//nested routes
const authRoutes = require("./routes/authRoutes");
const columnRoutes = require("./routes/columnRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger)
app.use("/api/auth", authRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);



// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection error:", err));

// Routes
app.get("/", (req, res) => res.send("API is running..."));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
