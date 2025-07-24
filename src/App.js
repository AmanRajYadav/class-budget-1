import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BudgetProvider } from './contexts/BudgetContext';
import StudentList from './components/StudentList';

function App() {
  return (
    <BudgetProvider>
      <StudentList />
    </BudgetProvider>
  );
}

export default App;
