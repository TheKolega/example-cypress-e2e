describe("Tests drag and drop functionality", { tags: "@remote" }, () => {
  beforeEach(() => {
    cy.visit("/drag_and_drop")
  })

  it("uses HTMLElement events", () => {
    cy.get("#column-a").should("have.text", "A").and("have.attr", "draggable", "true").trigger("dragstart")
    cy.get("#column-b").trigger("drop")
    cy.get("#column-a").trigger("dragend").should("have.text", "B").and("have.attr", "style", "opacity: 1;")
  })
})
