import ExpenseItem from './ExpenseItem'
function ExpenseList({ expenses, onDeleteExpense,onEditExpense  }) {

  return (
    <div className="expense-list">

      <h2>Expenses</h2>

      {expenses.length === 0 ? (
        <p className="no-expenses">
          No expenses added yet.
        </p>
      ) : (
        expenses.map((expense) => (
           <ExpenseItem
                key={expense.id}
                expense={expense}
                onDeleteExpense={onDeleteExpense}
                onEditExpense={onEditExpense}

          />
        ))
    )}

    </div>
  )

    }
    
   export default ExpenseList