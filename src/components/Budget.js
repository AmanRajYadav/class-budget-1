import React, { useState } from 'react';
import { Card, ProgressBar, Button, Stack } from 'react-bootstrap';
import { currencyFormatter } from '../utils';
import { useBudget } from '../contexts/BudgetContext';
import ViewExpensesModal from './ViewExpensesModal';

export default function Budget({ name, amount, max, id, onAddExpenseClick }) {
  const { deleteBudget, calculateBudgetExpenses } = useBudget();
  const currentAmount = calculateBudgetExpenses(id);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);
  
  const getProgressBarVariant = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return 'primary';
    if (ratio < 0.75) return 'warning';
    return 'danger';
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div className="me-2">{name}</div>
            <div className="d-flex align-items-baseline">
              {currencyFormatter.format(currentAmount)} 
              <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>
            </div>
          </Card.Title>
          <ProgressBar 
            className="rounded-pill" 
            variant={getProgressBarVariant(currentAmount, max)}
            min={0}
            max={max}
            now={currentAmount}
          />
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button 
              variant="outline-secondary" 
              className="ms-auto" 
              onClick={() => setShowViewExpensesModal(true)}
            >
              View Expenses
            </Button>
            <Button variant="outline-primary" onClick={onAddExpenseClick}>Add Expense</Button>
            <Button variant="outline-danger" onClick={() => deleteBudget({ id })}>Delete</Button>
          </Stack>
        </Card.Body>
      </Card>
      
      <ViewExpensesModal 
        budgetId={id}
        handleClose={() => setShowViewExpensesModal(false)}
        show={showViewExpensesModal}
      />
    </>
  );
}