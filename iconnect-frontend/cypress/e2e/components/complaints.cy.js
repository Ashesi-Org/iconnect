describe("Complaint Form Component", () => {
  beforeEach(() => {
    cy.visit("/submit-complaint");
  });

  it("should render the complaint form elements", () => {
    cy.get("h2").should("contain", "Create New Issue");
    cy.get('input[placeholder="Subject"]').should("be.visible");
    cy.get('textarea[placeholder="Description"]').should("be.visible");
    cy.get('input[type="file"]').should("be.visible");
    cy.get("select").should("be.visible");
    cy.contains("Anonymous").should("be.visible");
  });

  it("should allow user interaction and form submission", () => {
    const testSubject = "Test Subject";
    const testDescription = "Test Description";
    const testImage = "/courtyard.png";

    cy.get('input[placeholder="Subject"]').type(testSubject);
    cy.get('textarea[placeholder="Description"]').type(testDescription);
    cy.get('input[type="file"]').attachFile(testImage);

    cy.get("button").contains("Submit").click();

    cy.contains("Issue created successfully").should("be.visible");
    cy.url().should("include", "/success");
  });

  it("should display error messages for invalid inputs", () => {
    cy.get("button").contains("Submit").click();
    cy.contains("Invalid form data. Please check your inputs.").should(
      "be.visible"
    );
  });

  it("should validate form field limits", () => {
    cy.get('input[placeholder="Subject"]').type("a".repeat(60));
    cy.get('input[placeholder="Subject"]').should("have.value", "a".repeat(50));
    cy.contains("Subject should not exceed 50 characters").should("be.visible");
  });

  it("should allow user to upload an image", () => {
    cy.get('input[type="file"]').attachFile("test-image.jpg");
    cy.contains("Attached").should("be.visible");
    cy.get("img").should("be.visible");
  });
});
