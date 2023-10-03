describe("ResetPassword Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/resetpassword"); // Substitua a URL do local host :)
  });

  it("should render the initial form", () => {
    cy.get(".form-content").should("be.visible");
    cy.get("input#reset_password_token").should("exist");
    cy.get("input#password").should("exist");
    cy.get("input#password_confirmation").should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should submit the form and show success message", () => {
    cy.get("input#reset_password_token").type("your_token");
    cy.get("input#password").type("new_password");
    cy.get("input#password_confirmation").type("new_password");

    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
    cy.get(".success").should("contain", "Senha redefinida com sucesso!");
  });

  it("should handle form validation errors", () => {
    cy.get('button[type="submit"]').click();

    cy.get(".error-message").should("be.visible");
    cy.get(".error-message").should("contain", "Campo obrigatório");

    cy.get("input#reset_password_token").type("your_token");
    cy.get("input#password").type("password1");
    cy.get("input#password_confirmation").type("password2");

    cy.get('button[type="submit"]').click();
    cy.get(".error-message").should("be.visible");
    cy.get(".error-message").should("contain", "As senhas não coincidem");
  });
});
