import { useState } from "react";
import Modal from "./Modal";
import { createCategory } from "../services/category";

const AddCategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async () => {
    try {
      await createCategory({ name: categoryName });
      onCategoryAdded();
      setCategoryName("");
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    setCategoryName("");
    onClose();
  };

  return (
    <Modal
      title="Add New Category"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="categoryName">Category Name</label>
        <input
          id="categoryName"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          required
        />
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
