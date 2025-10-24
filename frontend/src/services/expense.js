import axios from "axios";

const EXPENSE_API = "http://localhost:8000/api/v1/expenses";

export const createExpense = async (expenseData) => {
  try {
    const response = await axios.post(EXPENSE_API, expenseData);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getExpense = async (expenseId) => {
  try {
    const response = await axios.get(`${EXPENSE_API}/${expenseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getExpensesByCategoryId = async (categoryId) => {
  try {
    const response = await axios.get(`${EXPENSE_API}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const updateExpense = async (expenseId, expenseData) => {
  try {
    const response = await axios.patch(
      `${EXPENSE_API}/${expenseId}`,
      expenseData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(`${EXPENSE_API}/${expenseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const expenseService = {
  createExpense,
  getExpense,
  getExpensesByCategoryId,
  updateExpense,
  deleteExpense,
};

export default expenseService;
