import { useEffect, useState } from 'react'
import { loadExpenses, saveExpenses } from './utils/storage'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'

function App() {

    const [expenses, setExpenses] = useState(loadExpenses)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const filteredExpenses = expenses.filter((expense) => {
  const matchesSearch = expense.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  const matchesCategory =
    selectedCategory === 'All' ||
    expense.category === selectedCategory

  return matchesSearch && matchesCategory
})
const totalExpenses = expenses.reduce((total, expense) => {
  return total + Number(expense.amount)
}, 0)
const categoryTotals = expenses.reduce((totals, expense) => {
  const category = expense.category
  const amount = Number(expense.amount)

  totals[category] = (totals[category] || 0) + amount

  return totals
}, {})
    useEffect(() => {
  saveExpenses(expenses)
}, [expenses])
    const [editingExpense, setEditingExpense] = useState(null)

      const addExpense = (expense) => {

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        ...expense,
        id: Date.now()
      }
    ])

  }
  const deleteExpense = (id) => {

  setExpenses((currentExpenses) =>
    currentExpenses.filter((expense) => expense.id !== id)
  )

}
const editExpense = (expense) => {
  setEditingExpense(expense)
}
const cancelEdit = () => {
  setEditingExpense(null)
}
const updateExpense = (updatedExpense) => {

  setExpenses((currentExpenses) =>
    currentExpenses.map((expense) =>
      expense.id === updatedExpense.id
        ? updatedExpense
        : expense
    )
  )

  setEditingExpense(null)
}

  return (
    <div className="app">

      {/* Navigation Bar */}
      <header className="navbar">

        <div className="logo">
          💰 Smart Expense Manager
        </div>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#expenses">Expenses</a>
        </nav>

      </header>


      {/* Main Content */}
      <main className="main-content">

        {/* Welcome Section */}
        <section className="welcome-section">

          <h1>Good morning 👋</h1>

          <p>
            Here's your spending overview
          </p>

        </section>


        {/* Summary Cards */}
        <section className="summary-grid">

          {/* Total Spent */}
          <div className="summary-card">

            <div className="card-icon">
              💰
            </div>

            <div>
              <p>Total Spent</p>
              <h2>₹0</h2>
            </div>

          </div>



          {/* This Month */}
          <div className="summary-card">

            <div className="card-icon">
              📅
            </div>

            <div>
              <p>This Month</p>
              <h2>₹0</h2>
            </div>

          </div>


          {/* Transactions */}
          <div className="summary-card">

            <div className="card-icon">
              🧾
            </div>

            <div>
              <p>Transactions</p>
              <h2>0</h2>
            </div>

          </div>

        </section>


        {/* Recent Expenses */}
        <section className="expenses-section">

          <div className="section-header">

            <div>

              <h2>Recent Expenses</h2>

              <p>
                Your latest spending activity
              </p>

            </div>



            <button className="add-button">
              + Add Expense
            </button>

          </div>


          {/* Empty State */}
          <div className="empty-state">

            <div className="empty-icon">
              🧾
            </div>

            <h3>
              No expenses yet
            </h3>

            <p>
              Start tracking your spending by
              adding your first expense.
            </p>

            <button className="empty-button">
              + Add Your First Expense
            </button>

          </div>
          <div className="category-summary">
  <h2>Spending by Category</h2>

  <div className="category-summary-grid">
    {Object.entries(categoryTotals).map(([category, amount]) => (
      <div className="category-summary-card" key={category}>
        <h3>{category || 'Uncategorized'}</h3>
        <p>₹{amount.toFixed(2)}</p>
      </div>
    ))}
  </div>

  {Object.keys(categoryTotals).length === 0 && (
    <p>No expenses to summarize yet.</p>
  )}
</div>
          <ExpenseForm onAddExpense={addExpense}
          editingExpense={editingExpense}
          onUpdateExpense={updateExpense} 
          onCancelEdit={cancelEdit}
          />
          <div className="search-container">
  <input
    type="text"
    placeholder="Search expenses..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />
</div>
<div className="category-filter">
  <label htmlFor="categoryFilter">
    Filter by category:
  </label>

  <select
    id="categoryFilter"
    value={selectedCategory}
    onChange={(event) =>
      setSelectedCategory(event.target.value)
    }
  >
    <option value="All">All categories</option>
    <option value="Food">Food</option>
    <option value="Travel">Travel</option>
    <option value="Shopping">Shopping</option>
    <option value="Education">Education</option>
  </select>
</div>
          <ExpenseList expenses={filteredExpenses}
          onDeleteExpense={deleteExpense}
          onEditExpense={editExpense}

          />

        </section>

      </main>

    </div>
  )
}

export default App