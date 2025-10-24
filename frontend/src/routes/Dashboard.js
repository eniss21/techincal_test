import { useState, useEffect } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import ExpenseNotch from "../components/ExpenseNotch";
import AddCategoryModal from "../components/AddCategoryModal";
import { getAllCategories, deleteCategory } from "../services/category";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data, ok } = await getAllCategories();
      if (!ok) {
        setCategories([]);
        return;
      }
      setCategories(data);
    } catch (e) {
      setCategories([]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories();
    } catch (e) {
      console.error(e);
    }
  };

  const totalExpenses = categories.reduce(
    (sum, category) => sum + (category.totalAmount || 0),
    0
  );

  return (
    <div className="dashboard">
      <Header />
      {loading ? (
        <div>Loading categories...</div>
      ) : (
        <Main
          categories={categories}
          onAddCategory={() => setIsModalOpen(true)}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
      <ExpenseNotch totalExpenses={totalExpenses} />
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCategoryAdded={fetchCategories}
      />
    </div>
  );
}
