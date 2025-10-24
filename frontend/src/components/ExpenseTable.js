import "../styles/categoryTable.css";

export default function ExpenseTable({ expenses, onDelete }) {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length === 0 ? (
          <tr>
            <td colSpan="4" className="empty-row">
              No expenses yet
            </td>
          </tr>
        ) : (
          expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
              <td>{expense.description}</td>
              <td className="amount-cell">${expense.amount.toFixed(2)}</td>
              <td>
                <button
                  className="action-btn delete-btn"
                  onClick={() => onDelete(expense._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      <tfoot>
        <tr className="total-row">
          <td colSpan="2">
            <strong>Total</strong>
          </td>
          <td className="amount-cell">
            <strong>${totalAmount.toFixed(2)}</strong>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}
