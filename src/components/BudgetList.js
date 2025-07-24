import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useBudget } from '../contexts/BudgetContext';
import Budget from './Budget';
import AddBudgetModal from './AddBudgetModal';
import AddExpenseModal from './AddExpenseModal';
import TotalBudgetCard from './TotalBudgetCard';
import { useState } from 'react';

export default function BudgetList() {
  const { budgets } = useBudget();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setSelectedBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        </div>
        
        <Row>
          {budgets.map(budget => (
            <Col key={budget.id} xs={12} md={6} lg={4}>
              <Budget 
                id={budget.id}
                name={budget.name}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            </Col>
          ))}
          <Col xs={12} md={6} lg={4}>
            <TotalBudgetCard />
          </Col>
        </Row>
      </Container>

      <AddBudgetModal 
        show={showAddBudgetModal} 
        handleClose={() => setShowAddBudgetModal(false)} 
      />
      
      <AddExpenseModal 
        show={showAddExpenseModal} 
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={selectedBudgetId}
      />
    </>
  );
}