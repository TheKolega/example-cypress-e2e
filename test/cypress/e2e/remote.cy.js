describe("Tests external website example", { tags: "@remote" }, () => {
  it("logs in using session saving", () => {
    cy.loginFormCookie(Cypress.env("cookieLoginUrl"))
    cy.visit(Cypress.env("cookieVerifyUrl"))
    cy.contains("admin status: true").should("be.visible")
  })

  it("ensures the user is not kept logged in due to test isolation", () => {
    cy.visit(Cypress.env("cookieVerifyUrl"))
    cy.contains("admin status: true").should("not.exist")

    cy.loginFormCookie(Cypress.env("cookieLoginUrl"))
    cy.visit(Cypress.env("cookieVerifyUrl"))
    cy.contains("admin status: true").should("be.visible")
  })
})
