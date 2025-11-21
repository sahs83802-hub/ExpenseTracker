// backend/routes/expenseRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.use(protect); // all expense routes are protected

router.post("/", addExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);

module.exports = router;
