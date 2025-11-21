// backend/controllers/dashboardController.js
const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const incomes = await Income.find({ user: userId });
    const expenses = await Expense.find({ user: userId });

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = totalIncome - totalExpense;

    const incomeByCategory = {};
    const expenseByCategory = {};

    incomes.forEach((i) => {
      incomeByCategory[i.category] =
        (incomeByCategory[i.category] || 0) + i.amount;
    });

    expenses.forEach((e) => {
      expenseByCategory[e.category] =
        (expenseByCategory[e.category] || 0) + e.amount;
    });

    const recentIncome = incomes
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);
    const recentExpense = expenses
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    return res.json({
      totalIncome,
      totalExpense,
      balance,
      incomeByCategory,
      expenseByCategory,
      recentIncome,
      recentExpense,
    });
  } catch (err) {
    console.error("Dashboard error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardSummary };
