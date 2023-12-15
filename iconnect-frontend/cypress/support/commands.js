
Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:2055'); //the login page is located at the root URL '/'
  
    // Enter the username and password in the login form
    cy.get('input[name="email"]').type(username);
    cy.get('input[name="password"]').type(password);
  
    // Submit the form
    cy.get('form').submit();
  
    //  if the user is redirected to the dashboard page after login
    cy.url().should('include', '/dashboard');
  });
  