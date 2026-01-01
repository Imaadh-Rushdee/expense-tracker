// src/components/ExpenseList.jsx
import React from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (!expenses || expenses.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        No expenses to show.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-300">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default ExpenseList;
