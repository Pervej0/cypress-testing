describe("Login Page OTP", () => {
  beforeEach(() => {
    cy.visit("https://pos-staging.hunnycoders.com/login");
  });
  it("OTP successfully sent and received", () => {
    cy.get("#phone").type("01757110296").should("have.value", "01757110296");
    cy.get("#password").type("123456").should("have.value", "123456");
    cy.get("form").within(() => {
      cy.get("button").click();
    });
    // wait for otp mail send
    cy.wait(10000);
    // fetch otp from gmail
    cy.task("fetchOTP").then((otp) => {
      cy.log(`Fetched OTP: ${otp}`);
      // cy.wait(10000);
      cy.get("#otp").type(otp);
      cy.get("form").within(() => {
        cy.get("button").should(($btn) => {
          expect($btn.text().trim()).to.eq("Verify OTP");
        });
        cy.get("button").click();
      });

      // Assert successful verification
      // cy.contains("Verification successful").should("be.visible");
    });

    // cy.get("#otp").type("01757110296").should("have.value", "01757110296");
  });
});
