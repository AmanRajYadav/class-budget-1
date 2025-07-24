import React, { useState } from 'react';
import { Modal, Button, Stack, Tabs, Tab } from 'react-bootstrap';
import { useBudget } from '../contexts/BudgetContext';
import { currencyFormatter, formatDate } from '../utils';

export default function ViewExpensesModal({ studentId, studentName, handleClose, show }) {
  const { 
    getStudentExpenses, 
    getStudentPayments, 
    deleteExpense, 
    deletePayment,
    calculateStudentExpenses,
    calculateStudentPayments,
    calculateStudentNetIncome
  } = useBudget();

  const [activeTab, setActiveTab] = useState('expenses');
  
  const expenses = getStudentExpenses(studentId);
  const payments = getStudentPayments(studentId);
  const totalExpenses = calculateStudentExpenses(studentId);
  const totalPayments = calculateStudentPayments(studentId);
  const netIncome = calculateStudentNetIncome(studentId);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <div>{studentName}'s Financial Details</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <Stack direction="horizontal" gap={3} className="summary-stats">
            <div className="stat-box">
              <div className="stat-label">Total Payments</div>
              <div className="stat-value text-success">{currencyFormatter.format(totalPayments)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Total Expenses</div>
              <div className="stat-value text-danger">{currencyFormatter.format(totalExpenses)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Net Income</div>
              <div className={`stat-value ${netIncome < 0 ? 'text-danger' : 'text-success'}`}>
                {currencyFormatter.format(netIncome)}
              </div>
            </div>
          </Stack>
        </div>
        
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="expenses" title="Expenses">
            {expenses.length === 0 ? (
              <p className="text-muted text-center py-3">No expenses recorded yet</p>
            ) : (
              <Stack direction="vertical" gap={3}>
                {expenses.map(expense => (
                  <Stack direction="horizontal" gap={2} key={expense.id} className="expense-item p-2">
                    <div className="me-auto">
                      <div className="fs-5">{expense.description}</div>
                      <small className="text-muted">{formatDate(expense.date)}</small>
                    </div>
                    <div className="fs-5 text-danger">
                      {currencyFormatter.format(expense.amount)}
                    </div>
                    <Button
                      onClick={() => deleteExpense({ id: expense.id })}
                      size="sm"
                      variant="outline-danger"
                      className="ms-2"
                    >
                      &times;
                    </Button>
                  </Stack>
                ))}
              </Stack>
            )}
          </Tab>
          
          <Tab eventKey="payments" title="Payments">
            {payments.length === 0 ? (
              <p className="text-muted text-center py-3">No payments recorded yet</p>
            ) : (
              <Stack direction="vertical" gap={3}>
                {payments.map(payment => (
                  <Stack direction="horizontal" gap={2} key={payment.id} className="payment-item p-2">
                    <div className="me-auto">
                      <div className="fs-5">Fee Payment</div>
                      <small className="text-muted">{formatDate(payment.date)}</small>
                    </div>
                    <div className="fs-5 text-success">
                      {currencyFormatter.format(payment.amount)}
                    </div>
                    <Button
                      onClick={() => deletePayment({ id: payment.id })}
                      size="sm"
                      variant="outline-danger"
                      className="ms-2"
                    >
                      &times;
                    </Button>
                  </Stack>
                ))}
              </Stack>
            )}
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}