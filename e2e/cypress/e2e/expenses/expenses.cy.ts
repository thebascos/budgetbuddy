describe("Expenses", () => {
  beforeEach(() => {
    cy.resetDb();
    cy.interceptAll();
    cy.login();
    cy.get("a").contains("Expenses").click();
    cy.wait("@getExpenses");
  });

  it("should display the expenses page", () => {
    cy.get("button").contains("Create Expense").should("exist");
  });
});
