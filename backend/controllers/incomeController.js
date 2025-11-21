// backend/controllers/incomeController.js
const Income = require("../models/Income");

const addIncome = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: "Amount and category are required" });
    }

    const income = await Income.create({
      user: req.user._id,
      amount,
      category,
      description: description || "",
      date: date ? new Date(date) : new Date(),
    });

    return res.status(201).json(income);
  } catch (err) {
    console.error("Add income error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({
      date: -1,
    });
    return res.json(incomes);
  } catch (err) {
    console.error("Get incomes error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.deleteOne();
    return res.json({ message: "Income deleted" });
  } catch (err) {
    console.error("Delete income error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addIncome, getIncomes, deleteIncome };
