
const STORAGE_KEY = 'smart-expense-manager-expenses'

export const loadExpenses = () => {
  try {
    const savedExpenses = localStorage.getItem(STORAGE_KEY)

    if (savedExpenses === null) {
      return []
    }

    const parsedExpenses = JSON.parse(savedExpenses)

    return Array.isArray(parsedExpenses)
      ? parsedExpenses
      : []
  } catch (error) {
    console.error('Could not load expenses:', error)
    return []
  }
}

export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(expenses)
    )
  } catch (error) {
    console.error('Could not save expenses:', error)
  }
}