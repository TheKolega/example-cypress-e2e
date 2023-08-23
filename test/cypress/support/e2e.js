// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands"

// Alternatively you can use CommonJS syntax:
// require('./commands')

import "cypress-plugin-xhr-toggle"

import registerCypressGrep from "@cypress/grep/src/support"
registerCypressGrep()

Cypress.on("uncaught:exception", (err, runnable) => {
  console.log(`{err, runnable}: {${err}, ${runnable}}`)

  return false
})
Cypress.on("uncaught:exception", (err, runnable, promise) => {
  console.log(`{err, runnable}: {${err}, ${runnable}}`)
  console.log("promise:")
  console.log(promise)

  return false
})

before(() => {
  if (!Cypress.env("defaultUser")) {
    const message = "=== Missing defaultUser env variable, please consult README.md ==="
    cy.log(message)
    cy.task("consoleLog", message)
    console.warn(message)
  }
})
