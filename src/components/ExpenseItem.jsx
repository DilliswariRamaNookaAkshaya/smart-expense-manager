function ExpenseItem({ expense, onDeleteExpense,onEditExpense }) {

  return (
    <div className="expense-card">

      <div className="expense-info">
        <h3>{expense.title}</h3>

        <p className="expense-category">
          {expense.category}
        </p>
      </div>

      <div className="expense-details">
        <p className="expense-amount">
          ₹{expense.amount}
        </p>

        <p className="expense-date">
          {expense.date}
        </p>
        <button
          className="edit-button"
          onClick={() => onEditExpense(expense)}
        >
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => onDeleteExpense(expense.id)}
        >
         Delete
        </button>

      </div>

    </div>
  )
}

export default ExpenseItem