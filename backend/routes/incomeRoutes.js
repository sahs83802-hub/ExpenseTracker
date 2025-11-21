// backend/routes/incomeRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomeController");

const router = express.Router();

router.use(protect); // all income routes are protected

router.post("/", addIncome);
router.get("/", getIncomes);
router.delete("/:id", deleteIncome);

module.exports = router;
