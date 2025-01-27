describe("Email form respond correctly", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });

  it("Form title and field respond correctly", () => {
    cy.getTestData("form-title").contains(/Testing Forms/i);
    cy.getTestData("email-field").find("input").as("emailField"); // alias

    cy.get("@emailField").type("pervej@gmail.com");
    cy.contains(/Successfully subbed: pervej@gmail.com!/i).should("not.exist");
    cy.getTestData("submit-button").click();
    cy.contains(/Successfully subbed: pervej@gmail.com!/i).should("exist");
    cy.wait(3000);

    cy.get("@emailField").type("pervej@gmail.io");
    cy.contains(/Invalid email: pervej@gmail.io!/i).should("not.exist");
    cy.getTestData("submit-button").click();
    cy.contains(/Invalid email: pervej@gmail.io!/i).should("exist");
    cy.wait(3000);

    cy.contains(/fail!/i).should("not.exist");
    cy.getTestData("submit-button").click();
    cy.contains(/fail!/i).should("exist");
  });
});
