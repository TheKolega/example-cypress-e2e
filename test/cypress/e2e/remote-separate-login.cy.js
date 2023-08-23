describe("Tests external website isolated login flow", { tags: "@remote" }, () => {
  it("verifies session saving works across specs", () => {
    cy.loginFormCookie(Cypress.env("cookieLoginUrl"))
    cy.visit(Cypress.env("cookieVerifyUrl"))
    cy.contains("admin status: true").should("be.visible")
  })
})
