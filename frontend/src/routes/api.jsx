// src/api.js
import axios from "axios";

// Replace with your FastAPI URL
const BASE_URL = "http://127.0.0.1:8000";

// Add a new expense
export const addExpense = async (expense) => {
  try {
    const response = await axios.post(`${BASE_URL}/expenses`, expense);
    return response.data.expense; // controller returns {message, expense}
  } catch (error) {
    console.error("Error adding expense:", error);
    return null;
  }
};

// Get all expenses
export const getAllExpenses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/expenses/all`);
    return response.data; // controller returns list of expenses
  } catch (error) {
    console.error("Error fetching all expenses:", error);
    return [];
  }
};

// Get today's expenses
export const getTodayExpenses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/expenses/today`);
    return response.data;
  } catch (error) {
    console.error("Error fetching today's expenses:", error);
    return [];
  }
};

// Get expenses for a specific date
export const getExpensesByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/expenses/${date}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching expenses for ${date}:`, error);
    return [];
  }
};

// Update an expense
export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${BASE_URL}/expenses/${id}`, expense);
    return response.data.expense;
  } catch (error) {
    console.error("Error updating expense:", error);
    return null;
  }
};

// Delete an expense
export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/expenses/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting expense:", error);
    return false;
  }
};

// Get total for a specific date
export const getTotalByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/expenses/total/day/${date}`);
    return response.data.total || 0;
  } catch (error) {
    console.error("Error fetching total by date:", error);
    return 0;
  }
};

// Get total for a month (YYYY-MM)
export const getTotalByMonth = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/expenses/total/month/${month}`);
    return response.data.total || 0;
  } catch (error) {
    console.error("Error fetching total by month:", error);
    return 0;
  }
};

