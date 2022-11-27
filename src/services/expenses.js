'use strict';

const getId = require('../utils').getId;

let expenses = [
  {
    id: 1,
    userId: 0,
    spentAt: '2022-11-27T17:49:52.129Z',
    title: 'phone',
    amount: 1,
    category: 'buy phone',
    note: 'buy new phone',
  },
];

function getAllExpenses(userId, from, to, category) {
  const filtredExpenses = expenses.filter(expense => (
    expense.userId === Number(userId)
    && category.includes(expense.category)
    && Date.parse(expense.spentAt) > Date.parse(from)
    && Date.parse(expense.spentAt) < Date.parse(to)
  ));

  return filtredExpenses;
}

function deleteExpense(expenseId) {
  const filtredExpenses = expenses.filter(expense => (
    expense.id !== Number(expenseId)
  ));

  if (expenses.length === filtredExpenses.length) {
    return false;
  }

  expenses = filtredExpenses;

  return true;
}

function getExpense(expenseId) {
  return expenses.find(
    expense => expense.id === Number(expenseId)
  );
}

function createNewExpense(userId, spentAt, title, amount, category, note) {
  let newId = 0;

  if (expenses.length) {
    newId = getId(expenses);
  }

  const newExpense = {
    id: newId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function updateExpense(expenseId, spentAt, title, amount, category, note) {
  const findExpenses = expenses.find(expense => (
    expense.id === Number(expenseId)
  ));

  if (!findExpenses) {
    return null;
  }

  Object.assign(findExpenses, {
    spentAt, title, amount, category, note,
  });

  return findExpenses;
}

module.exports = {
  getAllExpenses,
  getExpense,
  deleteExpense,
  createNewExpense,
  updateExpense,
};
