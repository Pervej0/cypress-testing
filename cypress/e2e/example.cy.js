describe("Example Page", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });

  it("Multiple route testing", () => {
    cy.getTestData("examples-route").click();
    cy.location("pathname").should("equal", "/examples");

    cy.getTestData("root-route").click();
    cy.location("pathname").should("equal", "/");

    cy.getTestData("overview-route").click();
    cy.location("pathname").should("equal", "/overview");

    cy.getTestData("fundamentals-route").click();
    cy.location("pathname").should("equal", "/fundamentals");

    cy.getTestData("forms-route").click();
    cy.location("pathname").should("equal", "/forms");

    cy.getTestData("component-route").click();
    cy.location("pathname").should("equal", "/component");

    cy.getTestData("best-practices-route").click();
    cy.location("pathname").should("equal", "/best-practices");
  });

  it("API request", () => {
    // cy.intercept("POST", "http://localhost:3000/examples", {
    //   body: {
    //     message: "Successfully intercepted request.",
    //   },
    // });

    cy.intercept("GET", "https://jsonplaceholder.typicode.com/todos", {
      fixture: "example.json",
    });

    cy.getTestData("post-grudges-btn").click();
  });

  it.only("Grudges", () => {
    cy.contains(/add some grudges/i);

    cy.getTestData("grudge-title").should("have.text", "Add Some Grudges");
    cy.getTestData("grudge-clear").should("not.exist");

    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });

    cy.getTestData("grudge-field").within(() => {
      cy.get("input").type("Some hit me on my back.");
    });
    cy.getTestData("grudge-add-btn").click();
    cy.getTestData("grudge-title").should("have.text", "Grudges");

    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    cy.getTestData("grudge-field").within(() => {
      cy.get("input").type("Another grudge.");
    });
    cy.getTestData("grudge-add-btn").click();
    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(0).should("contains.text", "Some hit me on my back.");
    });

    // removing grudge
    cy.getTestData("grudge-list").within(() => {
      cy.get("li")
        .its(0)
        .within(() => {
          cy.get("button").click();
        });
    });
    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    // clear grudge list
    cy.getTestData("grudge-clear").click();
    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
  });
});
