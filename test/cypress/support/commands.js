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

Cypress.Commands.add("registerRequest", (username = "testUsername", password = "almostUnbreakable!1!") => {
  cy.session([username, "register", "demoqa.com"], () => {
    cy.request({
      method: "POST",
      url: "https://demoqa.com/Account/v1/Authorized",
      form: true,
      body: { userName: username, password: password },
    }).then(
      (response) => {
        if (response.status != 200) {
          cy.request({
            method: "POST",
            url: "https://demoqa.com/Account/v1/User",
            failOnStatusCode: true,
            form: true,
            body: { userName: username, password: password },
          })
        } else {
          cy.log("User already registered, proceeding")
        }
      },
      {
        validate() {
          cy.request({
            method: "POST",
            url: "https://demoqa.com/Account/v1/Authorized",
            failOnStatusCode: true,
            form: true,
            body: { userName: username, password: password },
          })
        },
      },
    )
  })
})

Cypress.Commands.add("loginRequest", (username = "testUsername", password = "almostUnbreakable!1!") => {
  cy.session(
    [username, "login", "demoqa.com"],
    () => {
      cy.request({
        method: "POST",
        url: "https://demoqa.com/Account/v1/Login",
        form: true,
        body: { userName: username, password: password },
      }).then((response) => {
        expect(response.status).to.equal(200)
        cy.log(response)
      })
    },
    {
      validate() {
        cy.request({
          method: "POST",
          url: "https://demoqa.com/Account/v1/Authorized",
          failOnStatusCode: true,
          form: true,
          body: { userName: username, password: password },
        })
      },
    },
  )
})

Cypress.Commands.add("loginUI", (username = "testUsername", password = "almostUnbreakable!1!") => {
  cy.session(
    [username, "loginUI", "demoqa.com"],
    () => {
      cy.visit("https://demoqa.com/login")

      cy.get("#userName").clear().type(username)
      cy.get("#password").clear().type(password, { secret: true })
      cy.get("#login").click()

      cy.get(".main-header").should("be.visible")
      cy.get("#userName-value")
        .invoke("text")
        .then((text) => {
          expect(text.toLowerCase()).to.eq(username.toLowerCase())
        })
      cy.getCookie("userID").should("exist")
      cy.getCookie("userName").should("exist")
      cy.getCookie("expires").should("exist")
      cy.getCookie("token").should("exist")
    },
    {
      validate() {
        cy.getCookie("userID").should("exist")

        cy.request({
          method: "POST",
          url: "https://demoqa.com/Account/v1/Authorized",
          failOnStatusCode: true,
          form: true,
          body: { userName: username, password: password },
        })
      },
    },
  )
})
