import { el } from "@cy-support/elements"

describe("Tests local Vite+Vue3 webapp", { tags: "@local" }, () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('shows app is loaded and the counter is enabled with the starting state of "0"', () => {
    cy.visit("/")
    cy.url().should("contain", "localhost:7466")
    cy.contains("Vite + Vue").should("be.visible")
    cy.get(el.counterButton).should("be.enabled").and("contain", "count is 0")
  })

  it("increases the counter and verifies the state has reset after a reload", () => {
    cy.get(el.counterButton)
      .should("be.enabled")
      .click()
      .should("contain", "count is 1")
      .then((previousState) => {
        cy.log(previousState.text())
        cy.visit("/")
        cy.get(el.counterButton).its("text").should("not.be.equal", previousState.text())
      })
  })
})
