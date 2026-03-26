describe("Login", () => {
  it("should log in successfully and navigate to the dashboard", () => {
    cy.resetDb();
    cy.interceptAll();
    cy.login();
    cy.wait("@login");

    cy.get('[aria-label="dash-card"]').should("have.length", 3);
  });
});
