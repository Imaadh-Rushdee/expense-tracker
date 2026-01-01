import React from "react";
function ExpenseForm({ onSubmit, initialData, selectedDate }) {
  const [form, setForm] = React.useState({
    title: initialData?.title || "",
    amount: initialData?.amount || "",
    category: initialData?.category || "",
    desc: initialData?.desc || "",
    // date field removed, we will use selectedDate
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add selectedDate here instead of a field
    onSubmit({ ...form, date: selectedDate });
    setForm({ title: "", amount: "", category: "", desc: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="p-2 border rounded"
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="p-2 border rounded"
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        name="desc"
        placeholder="Description"
        value={form.desc}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {initialData ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
