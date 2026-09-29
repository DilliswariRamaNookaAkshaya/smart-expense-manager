import { useEffect,useState } from 'react'
function ExpenseForm({ onAddExpense,
    editingExpense,
    onUpdateExpense,
    onCancelEdit
}) {
    const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: ''
  })
  useEffect(() => {

    if (editingExpense) {

      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date
      })

    }

  }, [editingExpense])


        const handleSubmit = (e) => {

  e.preventDefault()

  if (
    !formData.title.trim() ||
    !formData.amount ||
    !formData.date
  ) {
    alert('Please fill in all fields.')
    return
  }

  if (editingExpense) {

    onUpdateExpense({
      id: editingExpense.id,
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date
    })

  } else {

    onAddExpense({
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date
    })

  }

  setFormData({
    title: '',
    amount: '',
    category: 'Food',
    date: ''
  })

}
  return (
    <div className="expense-form">

      <h2>  {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <form className="expense-form" onSubmit={handleSubmit}>

        {/* Expense Title */}
        <div className="form-group">

          <label htmlFor="title">
            Expense Title
          </label>

          <input
            type="text"
            id="title"
            placeholder="e.g. Lunch"
            value={formData.title}
            onChange={(e) =>
               setFormData({
               ...formData,
               title: e.target.value
               })
            }
          />

        </div>


        {/* Amount */}
        <div className="form-group">

          <label htmlFor="amount">
            Amount
          </label>

          <input
            type="number"
            id="amount"
            placeholder="e.g. 250"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
               ...formData,
               amount: e.target.value
              })
            }
          />

        </div>


        {/* Category */}
        <div className="form-group">

          <label htmlFor="category">
            Category
          </label>

          <select 
            id="category"
            value={formData.category}
            onChange={(e) =>
             setFormData({
              ...formData,
              category: e.target.value
             })
            }
          >

            <option value="Food">
              🍔 Food
            </option>

            <option value="Travel">
              🚕 Travel
            </option>

            <option value="Shopping">
              🛍️ Shopping
            </option>

            <option value="Bills">
              🏠 Bills
            </option>

            <option value="Education">
              📚 Education
            </option>

            <option value="Health">
              💊 Health
            </option>

            <option value="Entertainment">
              🎮 Entertainment
            </option>

            <option value="Other">
              📦 Other
            </option>

          </select>

        </div>


        {/* Date */}
        <div className="form-group">

          <label htmlFor="date">
            Date
          </label>

          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
               ...formData,
               date: e.target.value
              })
            }
         />
          

        </div>


        {/* Buttons */}
        <div className="form-buttons">

          <button
            type="button"
            className="cancel-button"
             onClick={() => {
                setFormData({
                  title: '',
                  amount: '',
                  category: 'Food',
                  date: ''
    })

    onCancelEdit()
  }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-button"
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>

        </div>

      </form>

    </div>
  )
}

export default ExpenseForm