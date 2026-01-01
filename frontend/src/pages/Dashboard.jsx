import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import DateSlider from "../components/DateSlider";
import {
  getExpensesByDate,
  addExpense,
  updateExpense,
  deleteExpense,
  getTotalByDate,
  getTotalByMonth,
} from "../routes/api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [totalDate, setTotalDate] = useState(0);
  const [totalMonth, setTotalMonth] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async (date) => {
    setLoading(true);
    const data = await getExpensesByDate(date);
    setExpenses(data);
    setLoading(false);
  };

  const fetchTotals = async (date) => {
    setTotalDate(await getTotalByDate(date));
    const month = date.slice(0, 7); // YYYY-MM
    setTotalMonth(await getTotalByMonth(month));
  };

  useEffect(() => {
    fetchExpenses(selectedDate);
    fetchTotals(selectedDate);
  }, [selectedDate]);

  const handleAddOrUpdate = async (expenseData) => {
    if (editingExpense) {
      const updated = await updateExpense(editingExpense.id, expenseData);
      if (updated) {
        setEditingExpense(null);
      }
    } else {
      await addExpense(expenseData);
    }
    setIsModalOpen(false);
    fetchExpenses(selectedDate);
    fetchTotals(selectedDate);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense(id);
      fetchExpenses(selectedDate);
      fetchTotals(selectedDate);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Expense Tracker Dashboard
      </h1>

      {/* Top controls: Date picker + totals + Add button */}
      <div className="max-w-2xl mx-auto mb-6 flex justify-between items-center gap-4 flex-wrap">
        <DateSlider
          selectedDate={selectedDate}
          onDateChange={(date) => setSelectedDate(date)}
        />  

        {/* Totals */}
        <div className="flex gap-4">
          <div className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white px-4 py-2 rounded">
            Total for date: ${totalDate.toFixed(2)}
          </div>
          <div className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-white px-4 py-2 rounded">
            Total for month: ${totalMonth.toFixed(2)}
          </div>
        </div>

        {/* Add Expense button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Expense
        </button>
      </div>

      {/* Expenses List */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center text-gray-500">Loading expenses...</p>
        ) : (
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>

      {/* Modal with Expense Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <ExpenseForm
    onSubmit={handleAddOrUpdate}
    initialData={editingExpense}
    selectedDate={selectedDate} // <-- pass it here
  />
</Modal>

    </div>
  );
}

export default Dashboard;
