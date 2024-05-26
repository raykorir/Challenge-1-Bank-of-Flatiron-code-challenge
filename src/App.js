import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionalTable';
import SearchBar from './components/SearchBar';
import TransactionForm from './components/TransactionalForm';
import './App.css';
import axios from 'axios';

function App() {
	const [transactions, setTransactions] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		axios
			.get('https://bank-of-flatiron-backend-5jfn.onrender.com/transactions')
			.then((res) => {
				const dataArray = Object.keys(res.data).map((key) => res.data[key]);
				setTransactions(dataArray);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	const addTransaction = (newTransaction) => {
		
		axios.post('https://bank-of-flatiron-backend-5jfn.onrender.com/transactions', newTransaction)
			.then((res) => {
			
				setTransactions([...transactions, res.data]);
				console.log('Transaction added successfully');
			})
			.catch((error) => {
				console.error('Error adding transaction:', error);
			});
	};

	const deleteTransaction = (id) => {
		// Remove the transaction from the frontend
		const updatedTransactions = transactions.filter(
			(transaction) => transaction.id !== id
		);
		setTransactions(updatedTransactions);
		// Remove the transaction from the backend
		fetch(`https://bank-of-flatiron-backend-5jfn.onrender.com/transactions/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Transaction deleted successfully');
			})
			.catch((error) => {
				console.error('Error deleting transaction:', error);
			});
	};

	const sortTransactions = (sortBy) => {
		let sortedTransactions = [...transactions];
		if (sortBy === 'category') {
			sortedTransactions.sort((a, b) => a.category.localeCompare(b.category));
		} else if (sortBy === 'description') {
			sortedTransactions.sort((a, b) =>
				a.description.localeCompare(b.description)
			);
		}
		setTransactions(sortedTransactions);
	};

	return (
		<div className='App'>
			<h1>The Royal Bank of Flatiron</h1>
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<TransactionTable
				transactions={transactions}
				searchTerm={searchTerm}
				deleteTransaction={deleteTransaction}
				sortTransactions={sortTransactions} // Pass sortTransactions as a prop
			/>
			<TransactionForm addTransaction={addTransaction} />
		</div>
	);
}

export default App;
