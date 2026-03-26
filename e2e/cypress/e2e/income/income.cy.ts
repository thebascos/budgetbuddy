describe("Income", () => {
  beforeEach(() => {
    cy.resetDb();
    cy.interceptAll();
    cy.login();
    cy.get("a").contains("Income").click();
    cy.wait("@getIncomes");
  });

  it("should create an income with source Salary, account Manual, and amount 5000", () => {
    cy.get("button").contains("Add Income").click();

    cy.get("#source").type("Salary");
    cy.get('select[name="source_account"]').select("MANUAL");
    cy.get("#amount").type("5000");
    cy.get('button[type="submit"]').click();
    cy.wait("@createIncome");

    cy.get('[aria-label="card"]').contains("Salary").should("exist");
    cy.get('[aria-label="card"]').contains("5,000.00").should("exist");
  });
});
