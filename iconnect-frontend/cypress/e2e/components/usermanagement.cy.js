describe("UserManagement Component", () => {
  beforeEach(() => {
    cy.intercept("https://ashesiiconnect.azurewebsites.net/api/user/admin/all", { fixture: "users.json" }).as(
      "fetchUsers"
    );
    cy.visit("/admin/people");
    // cy.wait("@fetchUsers");
  });

  it("should render the user management interface", () => {
    cy.contains("h1", "User Management").should("be.visible");
    cy.get('input[placeholder="Search..."]').should("be.visible");
    cy.get("table").should("be.visible");
    cy.get("thead").should("be.visible");
    cy.get("tbody").should("be.visible");
  });

  it("should filter users by name", () => {
    cy.get('input[placeholder="Search..."]').type("Junior Atta");
    cy.get("tbody > tr").should("have.length", 2);
  });

  it("should allow changing user roles", () => {
    cy.get("tbody > tr")
      .first()
      .within(() => {
        cy.get("select").select("administrator");
      });
    cy.contains("Role of user Junior Atta updated successfully").should(
      "be.visible"
    );
  });

  it("should display error when role change fails", () => {
    cy.intercept("/api/user/role/*", { statusCode: 500 }).as(
      "updateRoleFailure"
    );
    cy.get("tbody > tr")
      .first()
      .within(() => {
        cy.get("select").select("Administrator");
      });
    cy.wait("@updateRoleFailure");
    cy.contains("Can't update role at the moment").should("be.visible");
  });

  it("should display an error message when fetching users fails", () => {
    cy.intercept("/api/user/admin/all", { statusCode: 500 }).as(
      "fetchUsersError"
    );
    cy.visit("/admin/people");
    cy.wait("@fetchUsersError");
    cy.contains("Error fetching data").should("be.visible");
  });

  it("should display a confirmation dialog when changing user roles", () => {
    cy.get("tbody > tr")
      .first()
      .within(() => {
        cy.get("select").select("Admin");
      });
    cy.contains("Change Role Confirmation").should("be.visible");
    cy.contains("Confirm").click();
    cy.contains("Role of user John Doe updated successfully").should(
      "be.visible"
    );
  });

  it("should close the role change confirmation dialog when canceled", () => {
    cy.get("tbody > tr")
      .first()
      .within(() => {
        cy.get("select").select("Admin");
      });
    cy.contains("Change Role Confirmation").should("be.visible");
    cy.contains("Cancel").click();
    cy.contains("Change Role Confirmation").should("not.exist");
  });

  it("should sort users by role in ascending and descending order", () => {
    cy.get("th").contains("Role").click();
    cy.get("th").contains("Role").find("button").click();
  });
});
