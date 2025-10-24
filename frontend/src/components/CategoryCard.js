import { useNavigate } from "react-router-dom";
import "../styles/categoryCard.css";

export default function CategoryCard({ category, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/category/${category._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(category._id);
  };

  return (
    <div className="category-card" onClick={handleCardClick}>
      <button className="card-delete-btn" onClick={handleDeleteClick}>
        &times;
      </button>
      <div className="card-icon">
        <span>{category.name.charAt(0).toUpperCase()}</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{category.name}</h3>
        <p className="card-subtitle">{`$${
          category.totalAmount || 0
        } spended`}</p>
      </div>
    </div>
  );
}
