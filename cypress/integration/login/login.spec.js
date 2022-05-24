describe("Singup User", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should show message error when crendentials not valid", () => {
    cy.get("#email").type("teste@teste.com");
    cy.get("#password").type("123456");
    cy.get("#btn_login").click();
    cy.get(".Vue-Toastification__toast").should("be.visible");
    cy.get(".Vue-Toastification__toast-body").should(
      "have.text",
      "Usuário ou senha inválido!"
    );
  });

  it("should login with credentials correct and redirect to /user", () => {
    cy.get("#email").type("matheuscatalan@outlook.com");
    cy.get("#password").type("12345Ab");
    cy.get("#btn_login").click();
    cy.url().should("include", "/user");
  });

  it("should show message errror when email is incorrect", () => {
    cy.get("#email").type("teste@teste.com");
    cy.get("#password").type("12345Ab");
    cy.get("#btn_login").click();
    cy.get(".Vue-Toastification__toast").should("be.visible");
    cy.get(".Vue-Toastification__toast-body").should(
      "have.text",
      "Usuário ou senha inválido!"
    );
  });

  it("should show message errror when password is incorrect", () => {
    cy.get("#email").type("matheuscatalan@outlook.com");
    cy.get("#password").type("123456");
    cy.get("#btn_login").click();
    cy.get(".Vue-Toastification__toast").should("be.visible");
    cy.get(".Vue-Toastification__toast-body").should(
      "have.text",
      "Usuário ou senha inválido!"
    );
  });

  it('should not show button "login" and input password when email format is icorrect', () => {
    cy.get("#email").type("teste@teste");
    cy.get("#btn_login").should("not.be.visible");
    cy.get("#password").should("not.be.visible");
    cy.get("#email").type(".com");
    cy.get("#btn_login").should("not.be.visible");
    cy.get("#password").should("be.visible");
  });

  it('should not show button "login" when password format is incorrect', () => {
    cy.get("#email").type("teste@teste.com");
    cy.get("#password").type("12345");
    cy.get("#btn_login").should("not.be.visible");
    cy.get("#password").type("Ab");
    cy.get("#btn_login").should("be.visible");
  });

  it("should hide button when input password is cleaned", () => {
    cy.get("#email").type("teste@teste.com");
    cy.get("#password").type("12345Ab");
    cy.get("#password").clear();
    cy.get("#btn_login").should("not.be.visible");
  });

  it("should hide input password when input email is cleaned", () => {
    cy.get("#email").type("teste@teste.com");
    cy.get("#password").type("12345Ab");
    cy.get("#password").clear();
    cy.get("#email").clear();
    cy.get("#password").should("not.be.visible");
    cy.get("#btn_login").should("not.be.visible");
  });

  it("should show caption error when email format incorrect", () => {
    cy.get("#email").type("teste@teste");
    cy.get(".v-messages__message").should("be.visible");
    cy.get(".v-messages__message").should("have.text", "E-mail inválido");
  });

  it("should show caption error when password format incorrect", () => {
    cy.get("#email").type("teste@teste.com");
    cy.get("#password").type("12345");
    cy.get(".v-messages__message").should("be.visible");
    cy.get(".v-messages__message").should(
      "have.text",
      "Senha deve ter no mínimo 6 caracteres"
    );
  });
});
