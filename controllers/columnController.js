const Column = require("../models/Column");


exports.createColumn = async (req, res) => {
  const { title } = req.body;

  try {
    const column = await Column.create({ title, createdBy: req.user._id });
    res.status(201).json(column);
  } catch (error) {
    res.status(500).json({ message: "Error creating column" });
  }
};


exports.updateColumn = async (req, res) => {
  const { title } = req.body;

  try {
    const column = await Column.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    if (!column) return res.status(404).json({ message: "Column not found" });
    res.status(200).json(column);
  } catch (error) {
    res.status(500).json({ message: "Error updating column" });
  }
};


exports.deleteColumn = async (req, res) => {
  try {
    const column = await Column.findByIdAndDelete(req.params.id);

    if (!column) return res.status(404).json({ message: "Column not found" });
    res.status(200).json({ message: "Column deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting column" });
  }
};


exports.getColumns = async (req, res) => {
  try {
    const columns = await Column.find({ createdBy: req.user._id });
    res.status(200).json(columns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching columns" });
  }
};
