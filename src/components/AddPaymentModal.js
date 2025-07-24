import React, { useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useBudget } from '../contexts/BudgetContext';
import { currencyFormatter } from '../utils';

export default function AddPaymentModal({ show, handleClose, studentId, studentName, fee }) {
  const { addPayment } = useBudget();
  const amountRef = useRef();
  const dateRef = useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    
    // Get the current date in YYYY-MM-DD format for the default value
    const today = new Date().toISOString().split('T')[0];
    const date = dateRef.current.value || today;
    const paymentDate = new Date(date);
    
    addPayment({
      studentId,
      amount: parseFloat(amountRef.current.value),
      date,
      month: paymentDate.getMonth() + 1, // 1-12
      year: paymentDate.getFullYear()
    });
    
    handleClose();
  }
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment for {studentName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control 
              type="number" 
              required 
              ref={amountRef} 
              min={0} 
              step={100}
              defaultValue={fee}
            />
            <Form.Text className="text-muted">
              Regular fee: {currencyFormatter.format(fee)}
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Payment Date</Form.Label>
            <Form.Control 
              type="date" 
              ref={dateRef} 
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}