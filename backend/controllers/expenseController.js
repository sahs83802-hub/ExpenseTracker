// backend/controllers/expenseController.js
const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: "Amount and category are required" });
    }

    const expense = await Expense.create({
      user: req.user._id,
      amount,
      category,
      description: description || "",
      date: date ? new Date(date) : new Date(),
    });

    return res.status(201).json(expense);
  } catch (err) {
    console.error("Add expense error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });
    return res.json(expenses);
  } catch (err) {
    console.error("Get expenses error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne();
    return res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error("Delete expense error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addExpense, getExpenses, deleteExpense };
