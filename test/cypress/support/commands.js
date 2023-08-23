// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "loginFormCookie",
  (url = `${Cypress.config("baseUrl")}/login`, userObject = Cypress.env("defaultUser")) => {
    cy.session(
      [url, userObject?.username, "loginFormCookie"],
      () => {
        cy.visit(url)
        cy.get("[name=userName]").clear().type(userObject?.username)
        cy.get("[name=password]").clear().type(userObject?.password, { secret: true })
        cy.get("[type=submit]").click()
        cy.contains("h1", "logged in as admin").should("be.visible")
        cy.getCookie("adminMode").should("exist")
      },
      {
        validate() {
          cy.document().its("cookie").should("contain", "adminMode")
        },
        cacheAcrossSpecs: true,
      },
    )
  },
)
