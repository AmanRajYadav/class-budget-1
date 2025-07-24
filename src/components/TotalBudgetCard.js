import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { currencyFormatter } from '../utils';
import { useBudget } from '../contexts/BudgetContext';

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudget();
  
  const totalBudget = budgets.reduce((total, budget) => total + budget.max, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  if (totalBudget === 0) return null;

  const getProgressBarVariant = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return 'primary';
    if (ratio < 0.75) return 'warning';
    return 'danger';
  };

  return (
    <Card className="bg-light mb-3">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">Total</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(totalExpenses)} 
            <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(totalBudget)}</span>
          </div>
        </Card.Title>
        <ProgressBar 
          className="rounded-pill" 
          variant={getProgressBarVariant(totalExpenses, totalBudget)}
          min={0}
          max={totalBudget}
          now={totalExpenses}
        />
      </Card.Body>
    </Card>
  );
}