// ─── Dummy Data for MoneyMate Budget Tracker ───────────────────────────────

export const USER_PROFILE = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  avatar: null,
  currency: 'USD',
  memberSince: 'March 2024',
  totalSavings: 4250.00,
};

export const CATEGORIES = [
  { id: 'c1', name: 'Food & Dining', icon: 'restaurant', color: '#6C63FF', bg: '#f0effe' },
  { id: 'c2', name: 'Transport', icon: 'car', color: '#8266f3', bg: '#e4e1fd' },
  { id: 'c3', name: 'Shopping', icon: 'bag-handle', color: '#5a4be0', bg: '#f0effe' },
  { id: 'c4', name: 'Entertainment', icon: 'game-controller', color: '#4c3dc4', bg: '#e4e1fd' },
  { id: 'c5', name: 'Health', icon: 'medkit', color: '#a99bf8', bg: '#f0effe' },
  { id: 'c6', name: 'Utilities', icon: 'flash', color: '#3f33a0', bg: '#e4e1fd' },
  { id: 'c7', name: 'Education', icon: 'book', color: '#362d80', bg: '#f0effe' },
  { id: 'c8', name: 'Other', icon: 'ellipsis-horizontal', color: '#ccc6fb', bg: '#e4e1fd' },
];

export const EXPENSES = [
  { id: 'e1', categoryId: 'c1', amount: 45.50, description: 'Lunch at Chipotle', date: '2024-04-18', month: 4, year: 2024 },
  { id: 'e2', categoryId: 'c2', amount: 22.00, description: 'Uber to airport', date: '2024-04-17', month: 4, year: 2024 },
  { id: 'e3', categoryId: 'c3', amount: 120.00, description: 'Nike shoes', date: '2024-04-16', month: 4, year: 2024 },
  { id: 'e4', categoryId: 'c4', amount: 15.99, description: 'Netflix subscription', date: '2024-04-15', month: 4, year: 2024 },
  { id: 'e5', categoryId: 'c5', amount: 35.00, description: 'Pharmacy', date: '2024-04-14', month: 4, year: 2024 },
  { id: 'e6', categoryId: 'c6', amount: 80.00, description: 'Electricity bill', date: '2024-04-13', month: 4, year: 2024 },
  { id: 'e7', categoryId: 'c1', amount: 32.00, description: 'Grocery shopping', date: '2024-04-12', month: 4, year: 2024 },
  { id: 'e8', categoryId: 'c7', amount: 60.00, description: 'Udemy course', date: '2024-04-11', month: 4, year: 2024 },
  { id: 'e9', categoryId: 'c3', amount: 55.00, description: 'Amazon order', date: '2024-04-10', month: 4, year: 2024 },
  { id: 'e10', categoryId: 'c2', amount: 12.50, description: 'Metro pass', date: '2024-04-09', month: 4, year: 2024 },
  { id: 'e11', categoryId: 'c1', amount: 28.75, description: 'Dinner with friends', date: '2024-03-30', month: 3, year: 2024 },
  { id: 'e12', categoryId: 'c4', amount: 25.00, description: 'Cinema tickets', date: '2024-03-28', month: 3, year: 2024 },
  { id: 'e13', categoryId: 'c5', amount: 90.00, description: 'Gym membership', date: '2024-03-25', month: 3, year: 2024 },
  { id: 'e14', categoryId: 'c6', amount: 75.00, description: 'Internet bill', date: '2024-03-22', month: 3, year: 2024 },
  { id: 'e15', categoryId: 'c3', amount: 200.00, description: 'H&M clothing', date: '2024-03-20', month: 3, year: 2024 },
  { id: 'e16', categoryId: 'c1', amount: 18.50, description: 'Coffee & work snacks', date: '2024-03-18', month: 3, year: 2024 },
  { id: 'e17', categoryId: 'c2', amount: 35.00, description: 'Gas refill', date: '2024-03-15', month: 3, year: 2024 },
  { id: 'e18', categoryId: 'c8', amount: 50.00, description: 'Birthday gift', date: '2024-03-12', month: 3, year: 2024 },
  { id: 'e19', categoryId: 'c7', amount: 30.00, description: 'Books', date: '2024-02-28', month: 2, year: 2024 },
  { id: 'e20', categoryId: 'c1', amount: 65.00, description: 'Meal prep groceries', date: '2024-02-25', month: 2, year: 2024 },
  { id: 'e21', categoryId: 'c4', amount: 12.99, description: 'Spotify subscription', date: '2024-02-20', month: 2, year: 2024 },
  { id: 'e22', categoryId: 'c5', amount: 45.00, description: 'Doctor visit', date: '2024-02-18', month: 2, year: 2024 },
  { id: 'e23', categoryId: 'c6', amount: 90.00, description: 'Water + electricity', date: '2024-02-15', month: 2, year: 2024 },
  { id: 'e24', categoryId: 'c2', amount: 20.00, description: 'Taxi fare', date: '2024-02-10', month: 2, year: 2024 },
];

export const BUDGETS = [
  { id: 'b1', categoryId: 'c1', budget: 300, month: 4, year: 2024 },
  { id: 'b2', categoryId: 'c2', budget: 150, month: 4, year: 2024 },
  { id: 'b3', categoryId: 'c3', budget: 200, month: 4, year: 2024 },
  { id: 'b4', categoryId: 'c4', budget: 100, month: 4, year: 2024 },
  { id: 'b5', categoryId: 'c5', budget: 100, month: 4, year: 2024 },
  { id: 'b6', categoryId: 'c6', budget: 150, month: 4, year: 2024 },
  { id: 'b7', categoryId: 'c7', budget: 80, month: 4, year: 2024 },
  { id: 'b8', categoryId: 'c3', budget: 250, month: 3, year: 2024 },
  { id: 'b9', categoryId: 'c1', budget: 280, month: 3, year: 2024 },
  { id: 'b10', categoryId: 'c5', budget: 80, month: 3, year: 2024 },
];

export const INCOME = [
  { id: 'i1', amount: 3500, source: 'Salary', month: 4, year: 2024 },
  { id: 'i2', amount: 500, source: 'Freelance', month: 4, year: 2024 },
  { id: 'i3', amount: 3500, source: 'Salary', month: 3, year: 2024 },
  { id: 'i4', amount: 300, source: 'Side project', month: 3, year: 2024 },
  { id: 'i5', amount: 3500, source: 'Salary', month: 2, year: 2024 },
];

export const MONTHLY_SPENDING = [
  { month: 'Jan', spent: 820, income: 3500 },
  { month: 'Feb', spent: 1060, income: 3500 },
  { month: 'Mar', spent: 1180, income: 3800 },
  { month: 'Apr', spent: 477, income: 4000 },
  { month: 'May', spent: 0, income: 0 },
  { month: 'Jun', spent: 0, income: 0 },
];

// ─── Helper Functions ──────────────────────────────────────────────────────

export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id);

export const getExpensesByMonth = (month, year) =>
  EXPENSES.filter((e) => e.month === month && e.year === year);

export const getIncomeByMonth = (month, year) =>
  INCOME.filter((i) => i.month === month && i.year === year)
    .reduce((acc, i) => acc + i.amount, 0);

export const getBudgetsByMonth = (month, year) =>
  BUDGETS.filter((b) => b.month === month && b.year === year);

export const getTotalExpensesByMonth = (month, year) =>
  getExpensesByMonth(month, year).reduce((acc, e) => acc + e.amount, 0);

export const getExpensesByCategoryAndMonth = (month, year) => {
  const expenses = getExpensesByMonth(month, year);
  return CATEGORIES.map((cat) => {
    const total = expenses
      .filter((e) => e.categoryId === cat.id)
      .reduce((acc, e) => acc + e.amount, 0);
    return { ...cat, total };
  }).filter((c) => c.total > 0);
};

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
