describe('Authentication', () => {
  it('should show the login form on the landing page', () => {
    cy.visit('/');

    cy.get('#loginEmail').should('be.visible');
    cy.get('#loginPassword').should('be.visible');
    cy.get('app-login .btn-primary').should('contain', 'Log In');
  });

  it('should show an error with invalid credentials', () => {
    cy.visit('/');

    cy.get('#loginEmail').type('wrong@example.com');
    cy.get('#loginPassword').type('wrongpassword');
    cy.get('app-login .btn-primary').click();

    cy.get('.error-message').should('be.visible');
  });

  it('should log in with valid credentials and redirect to dashboard', () => {
    cy.visit('/');

    cy.get('#loginEmail').type('test@gmail.com');
    cy.get('#loginPassword').type('123456');
    cy.get('app-login .btn-primary').click();

    cy.url().should('include', '/home');
    cy.contains('Dashboard').should('be.visible');
  });
});
