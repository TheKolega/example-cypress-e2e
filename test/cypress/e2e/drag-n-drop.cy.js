import { el } from "@cy-support/elements"

describe("Tests drag and drop functionality", { tags: "@remote" }, () => {
  beforeEach(() => {
    cy.visit("/drag_and_drop")
  })

  it("uses HTMLElement events", () => {
    cy.get("#column-a").should("have.text", "A").and("have.attr", "draggable", "true").trigger("dragstart")
    cy.get("#column-b").trigger("drop")
    cy.get("#column-a").trigger("dragend").should("have.text", "B").and("have.attr", "style", "opacity: 1;")
  })

  it.skip("uses mouse events", () => {
    cy.get("#column-a").should("have.text", "A").and("have.attr", "draggable", "true")
    cy.get("#column-b").then((columnB) => {
      const bPosition = columnB.position()
      cy.get("#column-a")
        .trigger("mousedown", { which: 1 })
        // .trigger("mousemove", { pageX: bPosition.top, pageY: bPosition.left })
        // .trigger("mousemove", { clientX: 20, clientY: 20 })
        .trigger("mousemove", { offsetX: bPosition.top, offsetY: bPosition.left })
        .trigger("mouseup")
    })
  })
})
