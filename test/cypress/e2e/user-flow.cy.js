import { el } from "@cy-support/elements"

describe("Tests user flow in bookstore web app", { tags: "@remote" }, () => {
  const username = "testUsername"
  const password = "almostUnbreakable!1!"

  before(() => {
    cy.registerRequest(username, password)
  })

  it("fails with wrong password", () => {
    cy.visit("https://demoqa.com/login")

    cy.get("#userName").clear().type(username)
    cy.get("#password").clear().type("wrong-password", { secret: true })
    cy.get("#login").click()
    cy.contains("Invalid username or password!").should("be.visible").and("have.attr", "style", "color: red;")
  })

  it("logs in via UI", () => {
    cy.visit("https://demoqa.com/login")

    cy.get("#userName").clear().type(username)
    cy.get("#password").clear().type(password, { secret: true })
    cy.get("#login").click()

    cy.get(".main-header").should("be.visible")
    cy.get("#userName-value").should("have.text", "testUSername")
  })

  it.only("Adds a book to profile", () => {
    cy.loginUI(username, password)
    cy.visit("https://demoqa.com/profile")
    cy.contains("#submit", "Delete All Books").click()
    cy.get("#closeSmallModal-ok").click()

    cy.get("#gotoStore").click()
    cy.get('[role="row"] [id*=see-book').first().click()
    cy.contains("#addNewRecordButton", "Add To").should("be.visible").and("not.be.disabled").click()
    cy.contains("#addNewRecordButton", "Back To Book Store").click()
    cy.url().should("contain", "books")
    cy.contains("li", "Profile").click()

    cy.get('[role="row"] [id*=see-book').then((books) => {
      const initialLength = books.length
      cy.get("#gotoStore").click()
      cy.get('[role="row"] [id*=see-book').last().click()
      cy.contains("#addNewRecordButton", "Add To").click()
      cy.contains("li", "Profile").click()

      cy.get('[role="row"] [id*=see-book').should("have.length.greaterThan", initialLength)
    })
  })
})
