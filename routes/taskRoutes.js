const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getTasksByColumn,
  assignTask,
} = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createTask); 
router.get("/:columnId", protect, getTasksByColumn); 
router.put("/:id", protect, updateTask); 
router.delete("/:id", protect, deleteTask); 
router.patch("/:id/assign", protect, assignTask); 

module.exports = router;
