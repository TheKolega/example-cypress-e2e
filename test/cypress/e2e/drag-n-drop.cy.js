describe("Tests drag and drop functionality", { tags: "@remote" }, () => {
  it("uses HTMLElement events", () => {
    cy.visit("/drag_and_drop")

    cy.get("#column-a").should("have.text", "A").and("have.attr", "draggable", "true").trigger("dragstart")
    cy.get("#column-b").trigger("drop")
    cy.get("#column-a").trigger("dragend").should("have.text", "B").and("have.attr", "style", "opacity: 1;")
  })

  function getCoords(element, document) {
    let rect = element.getBoundingClientRect()

    return {
      left: rect.left + rect.width / 2 + document.documentElement.scrollLeft,
      top: rect.top + rect.height / 2 + document.documentElement.scrollTop,
    }
  }

  it("uses mouse events on a simple target", () => {
    cy.visit("https://demoqa.com/droppable")

    cy.document().then((doc) => {
      let elem = doc.querySelector("#droppable")
      let pos = getCoords(elem, doc)
      cy.get("#draggable")
        .trigger("mousedown", { which: 1 })
        .trigger("mousemove", { pageX: pos.left, pageY: pos.top })
        .trigger("mouseup")

      cy.get("#droppable").should("have.text", "Dropped!")
    })
  })

  it("uses mouse events on a complex target", () => {
    cy.visit("https://demoqa.com/droppable")

    cy.get("#droppableExample-tab-preventPropogation").click()
    cy.document().then((doc) => {
      let elem = doc.querySelector("#greedyDropBox>p")
      let pos = getCoords(elem, doc)

      cy.get("#dragBox")
        .trigger("mousedown", { which: 1 })
        .trigger("mousemove", { pageX: pos.left, pageY: pos.top, force: true })
        .trigger("mouseup", { force: true })

      cy.get("#greedyDropBox>p").should("have.text", "Dropped!")
      cy.get("#greedyDropBoxInner").should("not.have.text", "Dropped!")
      cy.get("#notGreedyDropBox").should("not.have.text", "Dropped!")
      cy.get("#notGreedyInnerDropBox").should("not.have.text", "Dropped!")
    })
  })
})
