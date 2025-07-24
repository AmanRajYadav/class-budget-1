import React, { useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useBudget } from '../contexts/BudgetContext';

export default function AddStudentModal({ show, handleClose }) {
  const nameRef = useRef();
  const courseRef = useRef();
  const feeRef = useRef();
  const startDateRef = useRef();
  const dueDayRef = useRef();
  const { addStudent } = useBudget();

  function handleSubmit(e) {
    e.preventDefault();
    
    addStudent({
      name: nameRef.current.value,
      course: courseRef.current.value,
      fee: parseFloat(feeRef.current.value),
      startDate: startDateRef.current.value,
      dueDay: parseInt(dueDayRef.current.value)
    });
    
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Student Name</Form.Label>
            <Form.Control 
              ref={nameRef} 
              type="text" 
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="course">
            <Form.Label>Course</Form.Label>
            <Form.Control 
              ref={courseRef} 
              type="text" 
              required 
              placeholder="e.g. Spoken English, Math, Science"
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="fee">
            <Form.Label>Monthly Fee (INR)</Form.Label>
            <Form.Control
              ref={feeRef}
              type="number"
              required
              min={0}
              step={100}
              defaultValue={11000}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              ref={startDateRef}
              type="date"
              required
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="dueDay">
            <Form.Label>Due Day of Month</Form.Label>
            <Form.Control
              ref={dueDayRef}
              type="number"
              required
              min={1}
              max={31}
              defaultValue={1}
            />
            <Form.Text className="text-muted">
              Day of the month when fee payment is due (1-31)
            </Form.Text>
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