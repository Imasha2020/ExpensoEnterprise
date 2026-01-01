import axios from "axios";

/**
 * Axios instance
 * Token automatically attached from localStorage
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api/transactions",
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
 * Create transaction
 */
export const createTransaction = (transactionData) => {
  return api.post("", transactionData);
};

/**
 * Get all transactions
 */
export const getAllTransactions = () => {
  return api.get("");
};

/**
 * Get single transaction by ID
 */
export const getTransactionById = (id) => {
  return api.get(`/${id}`);
};

/**
 * Update transaction
 */
export const updateTransaction = (id, transactionData) => {
  return api.put(`/${id}`, transactionData);
};

/**
 * Delete transaction
 */
export const deleteTransaction = (id) => {
  return api.delete(`/${id}`);
};
