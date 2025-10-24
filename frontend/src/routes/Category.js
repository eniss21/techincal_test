/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import AddExpenseModal from "../components/AddExpenseModal";
import ExpenseTable from "../components/ExpenseTable";
import { getExpensesByCategoryId, deleteExpense } from "../services/expense";
import "../styles/dashboard.css";
import "../styles/categoryTable.css";

export default function Category() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const { data, ok } = await getExpensesByCategoryId(id);
      if (!ok) {
        setExpenses([]);
        return;
      }
      setExpenses(data);
    } catch (e) {
      setExpenses([]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [id]);

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      fetchExpenses();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Header />
        <main>
          <div>Loading expenses...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header />
      <main>
        <div className="main-header">
          <h2>Category Expenses</h2>
          <button onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="expense-table-container">
          <div className="table-header">
            <h3>Expense List</h3>
            <button onClick={() => setIsModalOpen(true)}>+ Add Expense</button>
          </div>

          <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} />
        </div>

        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onExpenseAdded={fetchExpenses}
          categoryId={id}
        />
      </main>
    </div>
  );
}
