/// <reference types="cypress" />

Cypress.Commands.add('interceptAll', () => {
  // Auth
  cy.intercept('POST', '/auth/login').as('login');
  cy.intercept('GET', '/auth/profile').as('getProfile');

  // Budgets
  cy.intercept('GET', '/auth/budgets').as('getBudgets');
  cy.intercept('POST', '/auth/create-budget').as('createBudget');

  // Expenses
  cy.intercept('GET', '/auth/expenses').as('getExpenses');
  cy.intercept('POST', '/auth/create-expense').as('createExpense');

  // Bills
  cy.intercept('GET', '/auth/bills').as('getBills');
  cy.intercept('POST', '/auth/create-bill').as('createBill');

  // Income
  cy.intercept('GET', '/auth/incomes').as('getIncomes');
  cy.intercept('POST', '/auth/create-income').as('createIncome');

  // Savings
  cy.intercept('GET', '/auth/savings').as('getSavings');
  cy.intercept('POST', '/auth/create-saving').as('createSaving');
});
