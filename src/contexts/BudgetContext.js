import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BudgetContext = createContext();

export function useBudget() {
  return useContext(BudgetContext);
}

// Load data from localStorage
function loadFromLocalStorage(key, defaultValue) {
  try {
    const savedData = localStorage.getItem(key);
    if (savedData === null) {
      return defaultValue;
    }
    return JSON.parse(savedData);
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Save data to localStorage
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

export const BudgetProvider = ({ children }) => {
  // Initialize with default students if none exist in localStorage
  const defaultStudents = [
    {
      id: uuidv4(),
      name: "Anaya",
      course: "Spoken English and Grammar",
      fee: 11000,
      startDate: "2025-06-09",
      dueDay: 9
    },
    {
      id: uuidv4(),
      name: "Kavya",
      course: "Class 6th Mastery (Math, Science, English, Social Science)",
      fee: 11000,
      startDate: "2025-07-01",
      dueDay: 1
    }
  ];

  const [students, setStudents] = useState(() => loadFromLocalStorage('students', defaultStudents));
  const [expenses, setExpenses] = useState(() => loadFromLocalStorage('expenses', []));
  const [payments, setPayments] = useState(() => loadFromLocalStorage('payments', []));

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToLocalStorage('students', students);
  }, [students]);

  useEffect(() => {
    saveToLocalStorage('expenses', expenses);
  }, [expenses]);

  useEffect(() => {
    saveToLocalStorage('payments', payments);
  }, [payments]);

  // Add a student
  function addStudent({ name, course, fee, startDate, dueDay }) {
    setStudents(prevStudents => {
      if (prevStudents.find(student => student.name === name)) {
        return prevStudents;
      }
      return [...prevStudents, { 
        id: uuidv4(), 
        name, 
        course, 
        fee, 
        startDate, 
        dueDay 
      }];
    });
  }

  // Update a student
  function updateStudent(updatedStudent) {
    setStudents(prevStudents => {
      return prevStudents.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      );
    });
  }

  // Delete a student
  function deleteStudent({ id }) {
    setStudents(prevStudents => {
      return prevStudents.filter(student => student.id !== id);
    });
  }

  // Add an expense
  function addExpense({ description, amount, studentId, date }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { 
        id: uuidv4(), 
        description, 
        amount, 
        studentId, 
        date: date || new Date().toISOString().split('T')[0]
      }];
    });
  }

  // Delete an expense
  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id);
    });
  }

  // Add a payment record
  function addPayment({ studentId, amount, date, month, year }) {
    setPayments(prevPayments => {
      return [...prevPayments, { 
        id: uuidv4(), 
        studentId, 
        amount, 
        date: date || new Date().toISOString().split('T')[0],
        month: month || new Date().getMonth() + 1,
        year: year || new Date().getFullYear()
      }];
    });
  }

  // Delete a payment
  function deletePayment({ id }) {
    setPayments(prevPayments => {
      return prevPayments.filter(payment => payment.id !== id);
    });
  }

  // Get expenses for a specific student
  function getStudentExpenses(studentId) {
    return expenses.filter(expense => expense.studentId === studentId);
  }

  // Get payments for a specific student
  function getStudentPayments(studentId) {
    return payments.filter(payment => payment.studentId === studentId);
  }

  // Calculate total expenses for a student
  function calculateStudentExpenses(studentId) {
    return getStudentExpenses(studentId).reduce(
      (total, expense) => total + expense.amount, 0
    );
  }

  // Calculate total payments for a student
  function calculateStudentPayments(studentId) {
    return getStudentPayments(studentId).reduce(
      (total, payment) => total + payment.amount, 0
    );
  }

  // Calculate net income for a student (payments - expenses)
  function calculateStudentNetIncome(studentId) {
    const totalPayments = calculateStudentPayments(studentId);
    const totalExpenses = calculateStudentExpenses(studentId);
    return totalPayments - totalExpenses;
  }

  return (
    <BudgetContext.Provider value={{
      students,
      expenses,
      payments,
      addStudent,
      updateStudent,
      deleteStudent,
      addExpense,
      deleteExpense,
      addPayment,
      deletePayment,
      getStudentExpenses,
      getStudentPayments,
      calculateStudentExpenses,
      calculateStudentPayments,
      calculateStudentNetIncome
    }}>
      {children}
    </BudgetContext.Provider>
  );
};