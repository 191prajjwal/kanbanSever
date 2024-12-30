const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10h" });
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id email"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


exports.getUserEmail = async (req, res) => {
  const { userId } = req.params;  
  
  try {
    const user = await User.findById(userId, "email");  
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ email: user.email });
    
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
