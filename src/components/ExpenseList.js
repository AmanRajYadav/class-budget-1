import React from 'react';
import { ListGroup, Button, Stack } from 'react-bootstrap';
import { useBudget } from '../contexts/BudgetContext';
import { currencyFormatter } from '../utils';

export default function ExpenseList({ budgetId }) {
  const { getBudgetExpenses, deleteExpense, budgets } = useBudget();
  
  const expenses = getBudgetExpenses(budgetId);
  const budget = budgetId ? budgets.find(b => b.id === budgetId) : { name: 'Total', id: null };

  return (
    <div className="mt-4">
      <h4>{budget.name} Expenses</h4>
      <ListGroup>
        {expenses.map(expense => (
          <ListGroup.Item key={expense.id} className="d-flex justify-content-between align-items-center">
            <div className="me-auto">
              <div className="fw-bold">{expense.description}</div>
            </div>
            <div className="d-flex align-items-center">
              <span className="me-3">{currencyFormatter.format(expense.amount)}</span>
              <Button 
                size="sm" 
                variant="outline-danger" 
                onClick={() => deleteExpense({ id: expense.id })}
              >
                &times;
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}