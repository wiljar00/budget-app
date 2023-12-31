import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import IncomeExpense from './components/IncomeExpense';
import ExpenseCard from './components/ExpenseCard';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import Navbar from './components/Navbar';
// import GraphsCard from './components/GraphsCard';
import GraphComponent from './components/GraphComponent';
import BubbleChartComponent from './components/BubbleChartComponent';
import Homepage from './components/Homepage';

const App = () => {
  const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || [
    { id: 1, title: 'Groceries', amount: 50.0 },
    { id: 2, title: 'Gas', amount: 30.0 },
    { id: 3, title: 'Dinner', amount: 40.0 },
  ];

  const [expenses, setExpenses] = useState(initialExpenses);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, expense];
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  };

    const initialIncomes = JSON.parse(localStorage.getItem('incomes')) || [
    { id: 1, title: 'Paycheck', amount: 150.0 },
  ];

  const [incomes, setIncomes] = useState(initialIncomes);

  const addIncomeHandler = (income) => {
    setIncomes((prevIncomes) => {
      const updatedIncomes = [...prevIncomes, income];
      localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
      return updatedIncomes;
    });
  };

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [expenses, incomes]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes> 
            <Route path="/" element={<Homepage />} />
            <Route 
              path="/graphs"
              element={
                <div className='graph-page'>
                  {/* Pass expenses and incomes to the GraphComponent */}
                  <GraphComponent data={[...expenses, ...incomes]} />
                  <BubbleChartComponent data={[...expenses, ...incomes]} />
                </div>
              }
            />
            <Route
              path="/budget"
              element={ /* Render the default component */
                <div>
                  <IncomeExpense expenses={expenses} incomes={incomes} /> 
                  <div>
                    <div className='forms'>
                      <IncomeForm onAddIncome={addIncomeHandler} />
                      <ExpenseForm onAddExpense={addExpenseHandler} />
                    </div>
                    <div className="entry-headers">
                      <h3>Incomes: </h3>
                      <h3>Expenses: </h3>
                    </div>
                  </div>
                  <ExpenseCard 
                    expenses={expenses}
                    incomes={incomes}
                    setExpenses={setExpenses}
                    setIncomes={setIncomes} 
                  /> 
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;