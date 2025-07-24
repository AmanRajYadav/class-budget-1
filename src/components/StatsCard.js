import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { currencyFormatter, calculateExpectedPayments } from '../utils';
import { useBudget } from '../contexts/BudgetContext';

export default function StatsCard({ totalNetIncome, students }) {
  const { expenses, payments } = useBudget();
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  // Calculate total payments
  const totalPayments = payments.reduce((total, payment) => total + payment.amount, 0);
  
  // Calculate expected total payments based on start dates and monthly fees
  const expectedPayments = students.reduce((total, student) => {
    const monthlyPayments = calculateExpectedPayments(student.startDate, student.fee);
    return total + monthlyPayments;
  }, 0);
  
  // Calculate payment collection rate
  const collectionRate = expectedPayments > 0 ? (totalPayments / expectedPayments) * 100 : 0;
  
  // Calculate expense ratio (expenses as percentage of payments)
  const expenseRatio = totalPayments > 0 ? (totalExpenses / totalPayments) * 100 : 0;
  
  return (
    <Card className="stats-card">
      <Card.Body>
        <h3 className="mb-4">Financial Overview</h3>
        <Row>
          <Col md={3} sm={6} className="stat-column mb-3">
            <div className="stat-title">Total Income</div>
            <div className="stat-value text-success">{currencyFormatter.format(totalPayments)}</div>
          </Col>
          <Col md={3} sm={6} className="stat-column mb-3">
            <div className="stat-title">Total Expenses</div>
            <div className="stat-value text-danger">{currencyFormatter.format(totalExpenses)}</div>
          </Col>
          <Col md={3} sm={6} className="stat-column mb-3">
            <div className="stat-title">Net Income</div>
            <div className={`stat-value ${totalNetIncome < 0 ? 'text-danger' : 'text-success'}`}>
              {currencyFormatter.format(totalNetIncome)}
            </div>
          </Col>
          <Col md={3} sm={6} className="stat-column mb-3">
            <div className="stat-title">Collection Rate</div>
            <div className="stat-value">{collectionRate.toFixed(1)}%</div>
            <div className="stat-subtitle">
              {currencyFormatter.format(totalPayments)} / {currencyFormatter.format(expectedPayments)}
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={3} sm={6} className="stat-column mb-3">
            <div className="stat-title">Expense Ratio</div>
            <div className="stat-value">{expenseRatio.toFixed(1)}%</div>
            <div className="stat-subtitle">of total income</div>
          </Col>
          <Col md={3} sm={6} className="stat-column mb-3">
            <div className="stat-title">Active Students</div>
            <div className="stat-value">{students.length}</div>
          </Col>
          <Col md={3} sm={6} className="stat-column mb-3">
            <div className="stat-title">Monthly Revenue</div>
            <div className="stat-value">
              {currencyFormatter.format(students.reduce((sum, student) => sum + student.fee, 0))}
            </div>
          </Col>
          <Col md={3} sm={6} className="stat-column mb-3">
            <div className="stat-title">Profit Margin</div>
            <div className="stat-value">
              {totalPayments > 0 ? ((totalNetIncome / totalPayments) * 100).toFixed(1) : 0}%
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}