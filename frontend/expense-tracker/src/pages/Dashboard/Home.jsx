import React, { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    incomeByCategory: {},
    expenseByCategory: {},
    recentIncome: [],
    recentExpense: [],
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/dashboard/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load dashboard data");
          setLoading(false);
          return;
        }

        setSummary(data);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-sm">{error}</div>;
  }

  const {
    totalIncome,
    totalExpense,
    balance,
    recentIncome,
    recentExpense,
  } = summary;

  return (
    <div className="p-6 space-y-6">
      {/* Top summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-sm text-gray-500">Total Balance</h3>
          <p className="text-2xl font-semibold mt-2">${balance.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-sm text-gray-500">Total Income</h3>
          <p className="text-2xl font-semibold mt-2 text-green-600">
            ${totalIncome.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-sm text-gray-500">Total Expense</h3>
          <p className="text-2xl font-semibold mt-2 text-red-600">
            ${totalExpense.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Income */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Recent Income</h3>
          {recentIncome.length === 0 ? (
            <p className="text-sm text-gray-500">No income yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {recentIncome.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between border-b last:border-b-0 pb-1"
                >
                  <span>{item.category}</span>
                  <span>${item.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Recent Expenses</h3>
          {recentExpense.length === 0 ? (
            <p className="text-sm text-gray-500">No expenses yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {recentExpense.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between border-b last:border-b-0 pb-1"
                >
                  <span>{item.category}</span>
                  <span>${item.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* You can later add your charts here using summary.incomeByCategory & expenseByCategory */}
    </div>
  );
};

export default Dashboard;
