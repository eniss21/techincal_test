import axios from "axios";

const CATEGORY_API = "http://localhost:8000/api/v1/categories";

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(CATEGORY_API, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_API);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${CATEGORY_API}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.patch(
      `${CATEGORY_API}/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${CATEGORY_API}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const categoryService = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
