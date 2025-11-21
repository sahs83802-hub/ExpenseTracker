import React, { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/expense`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load expense data");
        setLoading(false);
        return;
      }

      setExpenses(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch expenses error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!amount || !category) {
      setError("Please enter amount and category.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        setSaving(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          category,
          description,
          date: date || new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add expense.");
        setSaving(false);
        return;
      }

      setExpenses((prev) => [data, ...prev]);

      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");

      setSaving(false);
    } catch (err) {
      console.error("Add expense error:", err);
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/expense/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete expense.");
        return;
      }

      setExpenses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete expense error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Expense</h2>

      {/* Add Expense Form */}
      <form
        onSubmit={handleAddExpense}
        className="bg-white rounded-2xl shadow-md p-4 space-y-4 max-w-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Food, Rent, Transport..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Description (optional)
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details about this expense"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Date</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          className="btn-primary"
          disabled={saving}
        >
          {saving ? "Adding..." : "Add Expense"}
        </button>
      </form>

      {/* Expense List */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">All Expenses</h3>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="text-sm text-gray-500">No expense records yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Category</th>
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Amount</th>
                <th className="py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id} className="border-b last:border-b-0">
                  <td className="py-2">
                    {exp.date
                      ? new Date(exp.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2">{exp.category}</td>
                  <td className="py-2">{exp.description || "-"}</td>
                  <td className="py-2 text-right">
                    ${exp.amount.toFixed(2)}
                  </td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Expense;
