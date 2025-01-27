describe("Fundamental Test", () => {
  beforeEach(() => {
    cy.visit("/fundamentals");
    cy.viewport(1024, 724);
  });
  it("Contains correct header text", () => {
    cy.getTestData("fundamentals-header").contains(/Testing Fundamentals/i);
    cy.getTestData("fundamentals-header").should(
      "contain.text",
      "Testing Fundamentals"
    );
  });

  it("Accordions work perfectly", () => {
    cy.contains(
      /Within your describe block, you will also have it blocks/i
    ).should("not.be.visible");
    cy.get("[test-data=accordion-item-1]").click();
    cy.contains(
      /Within your describe block, you will also have it blocks/i
    ).should("be.visible");

    cy.get("[test-data=accordion-item-1] [role='button']").click();
    cy.contains(
      /Within your describe block, you will also have it blocks/i
    ).should("not.be.visible", { timeout: 10000 });
  });
});
