import { useState } from "react";
import Modal from "./Modal";
import { createExpense } from "../services/expense";

const AddExpenseModal = ({ isOpen, onClose, onExpenseAdded, categoryId }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      await createExpense({
        amount: Number(amount),
        description,
        categoryId,
      });
      onExpenseAdded();
      setAmount("");
      setDescription("");
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    setAmount("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      title="Add Expense"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
