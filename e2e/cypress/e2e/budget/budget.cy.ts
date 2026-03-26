describe("Budget", () => {
  beforeEach(() => {
    cy.resetDb();
    cy.interceptAll();
    cy.login();

    // create an income first since budget requires an income source
    cy.get("a").contains("Income").click();
    cy.wait("@getIncomes");

    cy.get("button").contains("Add Income").click();
    cy.get("#source").type("Salary");
    cy.get('select[name="source_account"]').select("MANUAL");
    cy.get("#amount").type("5000");
    cy.get('button[type="submit"]').click();
    cy.wait("@createIncome");

    // navigate to budgets
    cy.get("a").contains("Budgets").click();
    cy.wait("@getBudgets");
  });

  it("should create a budget with description Groceries and amount 2000", () => {
    cy.get("button").contains("Create Budget").click();
    cy.wait("@getIncomes");

    cy.get("#budgetDescription").type("Groceries");
    cy.get("#amount").type("2000");
    cy.get('select[name="incomeId"]').select("Salary");
    cy.get('button[type="submit"]').click();
    cy.wait("@createBudget");

    cy.get('[aria-label="card"]').contains("Groceries").should("exist");
    cy.get('[aria-label="card"]').contains("2,000.00").should("exist");
  });
});
