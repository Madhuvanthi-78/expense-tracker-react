import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExpenseChart = () => {
  const { transactions } = useContext(GlobalContext);

  const expenseByCategory = transactions.reduce((acc, curr) => {
    const cat = curr.category || 'General';
    acc[cat] = (acc[cat] || 0) + Math.abs(curr.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8BC34A',
          '#FF9800',
          '#9C27B0',
          '#03A9F4'
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Expenses by Category</h3>
      <Pie data={data} />
    </div>
  );
};

