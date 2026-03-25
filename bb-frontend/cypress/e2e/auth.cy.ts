describe('Authentication', () => {
  const testEmail = `testuser+${Date.now()}@example.com`;
  const testPassword = 'TestPass123!';
  const testName = 'Test User';

  it('should create a new account', () => {
    cy.prompt([
      'visit http://localhost:4200',
      `type "${testName}" in the input with placeholder "Your full name"`,
      `type "${testEmail}" in the input with placeholder "you@example.com" inside the signup form`,
      `type "${testPassword}" in the input with placeholder "Choose a password"`,
      'click the "Sign Up" button',
      'verify the URL contains "/home"',
    ]);
  });

  it('should log in with the created account', () => {
    cy.prompt([
      'visit http://localhost:4200',
      `type "${testEmail}" in the input with placeholder "you@example.com" inside the login form`,
      `type "${testPassword}" in the input with placeholder "Enter your password"`,
      'click the "Log In" button',
      'verify the URL contains "/home"',
      'verify the text "Dashboard" is visible',
    ]);
  });
});
