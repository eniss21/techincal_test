import "../styles/expenseNotch.css";

export default function ExpenseNotch({ totalExpenses = 0 }) {
  return (
    <div className="expense-notch">
      <div className="notch-content">
        <span className="notch-label">Total Expenses</span>
        <span className="notch-amount">${totalExpenses.toFixed(2)}</span>
      </div>
    </div>
  );
}
