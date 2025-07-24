// Currency formatter
// Currency formatter for INR
export const currencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: "INR",
  style: "currency",
  minimumFractionDigits: 0
});

// Format date to display in a readable format
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Get month name from month number (1-12)
export const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-IN', { month: 'long' });
};

// Calculate next due date based on start date and due day
export const calculateNextDueDate = (startDate, dueDay) => {
  const today = new Date();
  const start = new Date(startDate);
  
  // Create a date with the due day in the current month
  let nextDue = new Date(today.getFullYear(), today.getMonth(), dueDay);
  
  // If the due date has passed this month, move to next month
  if (today > nextDue) {
    nextDue = new Date(today.getFullYear(), today.getMonth() + 1, dueDay);
  }
  
  // If the start date is in the future, use the first due date
  if (start > today) {
    return start;
  }
  
  return nextDue;
};

// Calculate how many months have passed since the start date
export const calculateMonthsSinceStart = (startDate) => {
  const start = new Date(startDate);
  const today = new Date();
  
  // If start date is in the future, return 0
  if (start > today) {
    return 0;
  }
  
  const monthDiff = (today.getFullYear() - start.getFullYear()) * 12 + 
                    (today.getMonth() - start.getMonth());
  
  return monthDiff;
};

// Calculate expected total payments based on months since start and monthly fee
export const calculateExpectedPayments = (startDate, monthlyFee) => {
  const monthsPassed = calculateMonthsSinceStart(startDate);
  return monthsPassed * monthlyFee;
};