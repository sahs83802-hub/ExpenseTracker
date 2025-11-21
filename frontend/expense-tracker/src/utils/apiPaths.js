// Base URL from Vite .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

// API Routes
export const API = {
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,

  ADD_INCOME: `${API_BASE_URL}/api/income/add`,
  GET_INCOME: `${API_BASE_URL}/api/income/all`,
  DELETE_INCOME: `${API_BASE_URL}/api/income/delete`,

  ADD_EXPENSE: `${API_BASE_URL}/api/expense/add`,
  GET_EXPENSE: `${API_BASE_URL}/api/expense/all`,
  DELETE_EXPENSE: `${API_BASE_URL}/api/expense/delete`,

  DASHBOARD: `${API_BASE_URL}/api/dashboard/summary`,
};
