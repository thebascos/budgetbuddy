describe('Landing Page', () => {
  it('should display the landing page with login form', () => {
    cy.prompt([
      'visit http://localhost:4200',
      'verify the text "Take control of" is visible',
      'verify the text "Welcome back" is visible',
      'verify an input with placeholder "you@example.com" exists',
      'verify an input with placeholder "Enter your password" exists',
      'verify a button with text "Log In" exists',
    ]);
  });

  it('should show validation when submitting empty login form', () => {
    cy.prompt([
      'visit http://localhost:4200',
      'click the "Log In" button',
      'verify the login form is still visible',
    ]);
  });
});
