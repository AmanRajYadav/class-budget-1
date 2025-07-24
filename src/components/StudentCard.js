import React, { useState } from 'react';
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';
import { currencyFormatter, formatDate, calculateNextDueDate } from '../utils';
import { useBudget } from '../contexts/BudgetContext';
import AddExpenseModal from './AddExpenseModal';
import ViewExpensesModal from './ViewExpensesModal';
import AddPaymentModal from './AddPaymentModal';

export default function StudentCard({ id, name, course, fee, startDate, dueDay }) {
  const { 
    calculateStudentExpenses, 
    calculateStudentPayments, 
    calculateStudentNetIncome 
  } = useBudget();
  
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);
  
  // Get expenses for reference (used indirectly through calculateStudentExpenses)
  const totalExpenses = calculateStudentExpenses(id);
  const totalPayments = calculateStudentPayments(id);
  const netIncome = calculateStudentNetIncome(id);
  const nextDueDate = calculateNextDueDate(startDate, dueDay);
  
  // Calculate progress percentage (expenses as percentage of payments)
  const ratio = totalPayments === 0 ? 0 : totalExpenses / totalPayments;
  const progressBarVariant = ratio < 0.5 ? 'primary' : ratio < 0.75 ? 'warning' : 'danger';

  return (
    <>
      <Card className="student-card mb-3">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            <div className="me-2">{name}</div>
            <div className="d-flex align-items-baseline">
              <span className="text-muted fs-6 me-1">Net Income:</span>
              <span className={netIncome < 0 ? 'text-danger' : 'text-success'}>
                {currencyFormatter.format(netIncome)}
              </span>
            </div>
          </Card.Title>
          
          <div className="mb-3">
            <small className="text-muted">Course: {course}</small>
          </div>
          
          <div className="mb-3">
            <small className="text-muted">Started: {formatDate(startDate)}</small>
          </div>
          
          <div className="mb-3">
            <small className="text-muted">Monthly Fee: {currencyFormatter.format(fee)}</small>
          </div>
          
          <div className="mb-3">
            <small className="text-muted">Next Due: {formatDate(nextDueDate)}</small>
          </div>
          
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <div>Expenses vs Payments</div>
              <div>
                {currencyFormatter.format(totalExpenses)} / {currencyFormatter.format(totalPayments)}
              </div>
            </div>
            <ProgressBar 
              variant={progressBarVariant} 
              min={0} 
              max={totalPayments || 100} 
              now={totalExpenses} 
              className="rounded-pill"
            />
          </div>
          
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button 
              variant="outline-primary" 
              className="ms-auto"
              onClick={() => setShowAddPaymentModal(true)}
            >
              Add Payment
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowAddExpenseModal(true)}
            >
              Add Expense
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowViewExpensesModal(true)}
            >
              View Details
            </Button>
          </Stack>
        </Card.Body>
      </Card>
      
      <AddExpenseModal 
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultStudentId={id}
      />
      
      <AddPaymentModal 
        show={showAddPaymentModal}
        handleClose={() => setShowAddPaymentModal(false)}
        studentId={id}
        studentName={name}
        fee={fee}
      />
      
      <ViewExpensesModal 
        studentId={id}
        studentName={name}
        show={showViewExpensesModal}
        handleClose={() => setShowViewExpensesModal(false)}
      />
    </>
  );
}