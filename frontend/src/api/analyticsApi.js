import axios from "axios";
/**
 * Axios instance
 * Token automatically attached from localStorage
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api/analytics/category",
  headers: {
    "Content-Type": "application/json"
  }
});

// 🔐 Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("expense_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Get expenses by category
 */
export const getExpensesByCategory = () => {
  return api.get("/expense");
};

/**
 * Get income by category
 */
export const getIncomeByCategory = () => {
  return api.get("/income");
};