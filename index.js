const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

//nested routes
const authRoutes = require("./routes/authRoutes");
const columnRoutes = require("./routes/columnRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/columns", columnRoutes);



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
