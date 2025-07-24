import React, { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import StudentCard from './StudentCard';
import AddStudentModal from './AddStudentModal';
import AddExpenseModal from './AddExpenseModal';
import { useBudget } from '../contexts/BudgetContext';
import StatsCard from './StatsCard';

export default function StudentList() {
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const { students, calculateStudentNetIncome } = useBudget();

  // Calculate total net income across all students
  const totalNetIncome = students.reduce(
    (total, student) => total + calculateStudentNetIncome(student.id),
    0
  );

  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">Class Budget Manager</h1>
        <Button variant="primary" onClick={() => setShowAddExpenseModal(true)}>
          Add Expense
        </Button>
        <Button variant="outline-primary" onClick={() => setShowAddStudentModal(true)}>
          Add Student
        </Button>
      </Stack>

      <div className="mb-5">
        <StatsCard totalNetIncome={totalNetIncome} students={students} />
      </div>

      <h2 className="mb-4">Students</h2>
      
      <div className="students-grid">
        {students.map(student => (
          <StudentCard 
            key={student.id}
            id={student.id}
            name={student.name}
            course={student.course}
            fee={student.fee}
            startDate={student.startDate}
            dueDay={student.dueDay}
          />
        ))}
      </div>

      <AddStudentModal
        show={showAddStudentModal}
        handleClose={() => setShowAddStudentModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </Container>
  );
}