describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should log in successfully and navigate to the dashboard", () => {
    cy.get("#loginEmail").type("test@gmail.com");
    cy.get("#loginPassword").type("testtest");
    cy.get('button[type="submit"]').contains("Log In").click();

    cy.url().should("include", "/home/dashboard");
  });
});
