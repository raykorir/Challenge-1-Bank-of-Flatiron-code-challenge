import React from 'react';

const TransactionTable = ({ transactions, searchTerm, deleteTransaction }) => {
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filteredTransactions.sort((a, b) => a.description.localeCompare(b.description));
  const confirmDelete = (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
        deleteTransaction(transactionId);
    }
};

  return (
    <div className="table-container">
      <table className="transaction-table"> {/* Add transaction-table class */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
              <button onClick={() => confirmDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
