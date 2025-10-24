import CategoryCard from "./CategoryCard";

export default function Main({
  categories = [],
  onAddCategory,
  onDeleteCategory,
}) {
  return (
    <main>
      <section>
        <div className="main-header">
          <h2>Expense Categories</h2>
          <button onClick={onAddCategory}>+ Add Category</button>
        </div>
        {categories.length === 0 ? (
          <div className="empty-state">
            <p>No categories yet. Create your first category to get started!</p>
          </div>
        ) : (
          <div className="categories-grid">
            {categories.map((c) => (
              <CategoryCard
                key={c._id}
                category={c}
                onDelete={onDeleteCategory}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
