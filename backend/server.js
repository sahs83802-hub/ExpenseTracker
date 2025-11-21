// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS – allow Vite (local) + Vercel (production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-uw3l.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins, // allow both URLs
    credentials: true,
  })
);

// Body parsers & logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Expense Tracker API running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/income", require("./routes/incomeRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
