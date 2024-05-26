import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TransactionForm = ({ addTransaction }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && description && category && amount) {
      addTransaction({
        date: selectedDate.toISOString().split('T')[0], // Format the date as "YYYY-MM-DD"
        description,
        category,
        amount,
        id: Date.now(),
      });
      setSelectedDate(null);
      setDescription('');
      setCategory('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="Select a Date"
        dateFormat="yyyy-MM-dd"
        isClearable
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;