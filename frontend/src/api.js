// src/api.js
import axios from "axios";

// Use the API URL passed by Docker/Vite, or fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // important if you use cookies (JWT/session)
});

export default api;
