import React, { useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useBudget } from '../contexts/BudgetContext';

export default function AddExpenseModal({ show, handleClose, defaultStudentId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const studentIdRef = useRef();
  const dateRef = useRef();
  const { addExpense, students } = useBudget();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      studentId: studentIdRef.current.value,
      date: dateRef.current.value || new Date().toISOString().split('T')[0]
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              ref={descriptionRef} 
              type="text" 
              required 
              placeholder="Gift, Trophy, Books, etc."
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={1}
              placeholder="0"
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              ref={dateRef}
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="studentId">
            <Form.Label>Student</Form.Label>
            <Form.Select
              defaultValue={defaultStudentId}
              ref={studentIdRef}
              required
            >
              <option value="" disabled>Select a student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.course}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}