/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    interceptAll(): Chainable<void>;
    resetDb(): Chainable<void>;
  }
}

Cypress.Commands.add('resetDb', () => {
  cy.request('POST', 'http://localhost:3000/auth/reset-db');
});

Cypress.Commands.add('login', () => {
  const email = Cypress.env('TEST_EMAIL');
  const password = Cypress.env('TEST_PASSWORD');

  cy.visit('/');
  cy.get('#loginEmail').type(email);
  cy.get('#loginPassword').type(password);
  cy.get('button[type="submit"]').contains('Log In').click();
  cy.url().should('include', '/home/dashboard');
});
