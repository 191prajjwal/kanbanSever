const Task = require("../models/Task");


exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, columnId, assignedTo } = req.body;

  try {
    if (!title || !columnId) {
      return res.status(400).json({ message: "Title and Column ID are required" });
    }


    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      columnId,
      assignedTo,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error); // Log the actual error to the console
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, priority, columnId, assignedTo } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, columnId, assignedTo },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error updating task", error });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};


exports.getTasksByColumn = async (req, res) => {
  try {
    const tasks = await Task.find({ columnId: req.params.columnId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

exports.assignTask = async (req, res) => {
  const { assignedTo } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error assigning task", error });
  }
};
