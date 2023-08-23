describe("Tests session saving", { tags: "@remote" }, () => {
  const loggedInText = "admin status: true"

  it("logs in using session saving", () => {
    cy.loginFormCookie(Cypress.env("cookieLoginUrl"))
    cy.visit(Cypress.env("cookieVerifyUrl"))
    cy.contains(loggedInText).should("be.visible")
  })

  it("ensures the user is not kept logged in due to test isolation", () => {
    cy.visit(Cypress.env("cookieVerifyUrl"))
    cy.contains(loggedInText).should("not.exist")

    cy.loginFormCookie(Cypress.env("cookieLoginUrl"))
    cy.visit(Cypress.env("cookieVerifyUrl"))
    cy.contains(loggedInText).should("be.visible")
  })
})
