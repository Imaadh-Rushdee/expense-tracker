// src/components/ExpenseItem.jsx
import React from "react";

function ExpenseItem({ expense, onDelete, onEdit }) {
  const { id, title, amount, category, date, desc } = expense;

  return (
    <li className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition rounded">
      <div>
        <p className="font-semibold text-gray-800 dark:text-gray-200">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${Number(amount).toFixed(2)} • {category} • {date}
        </p>
        {desc && (
          <p className="text-sm text-gray-400 dark:text-gray-300">{desc}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(expense)}
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
