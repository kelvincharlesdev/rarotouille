import cy from "cypress";

describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5185/login"); // coloque sua porta de entrada aqui :) 
  });

  it("should successfully log in with valid credentials", () => {
    cy.get("#email").should("exist").type("your-email@example.com");
    cy.get("#password").type("your-password");
    cy.get("form").submit();

    cy.url().should("include", "/home");
  });

  it("should display an error message for invalid login", () => {
    cy.get("#email").should("exist").type("invalid-email@example.com");
    cy.get("#password").type("invalid-password");
    cy.get("form").submit();

    cy.contains("Email or password is incorrect").should("exist");
  });
});
