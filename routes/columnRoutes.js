const express = require("express");
const {
  createColumn,
  updateColumn,
  deleteColumn,
  getColumns,
} = require("../controllers/columnController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createColumn);
router.get("/", protect, getColumns);
router.put("/:id", protect, updateColumn);
router.delete("/:id", protect, deleteColumn);

module.exports = router;
