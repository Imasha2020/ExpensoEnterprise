import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/categories",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("expense_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all categories
export  const getCategories = () => {
  return api.get("");
};
