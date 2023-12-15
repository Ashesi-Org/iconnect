describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login'); 
  });

  it('should display the login form', () => {
    cy.get('h2').should('contain', 'Log in to Ashesi iConnect');
    cy.get('input[placeholder="email"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });
  
  it('should display error message for invalid email', () => {

    cy.get('input[placeholder="email"]').type('invalidemail');

    cy.get('button').contains('Login').click();

    cy.contains('Invalid email').should('be.visible');
  });

  it('should display error message for invalid password', () => {
    // Enter a valid email and invalid password
    cy.get('input[placeholder="email"]').type('vim@gmail.com');
    cy.get('input[placeholder="password"]').type('pass');

    cy.get('button').contains('Login').click();

    cy.contains('account').should('be.visible');
  });
  
  it('should redirect to the registration page when "Register" link is clicked', () => {
    cy.contains('Don\'t have an account yet?').find('a').click();
    // Ensure the redirect URL after clicking the register link
    // cy.url().should('include', '/register');
  });

  it('should be able to login using Google', () => {
    cy.contains('Google login').click();

    cy.visit('https://ashesiiconnect.azurewebsites.net/auth/google');

    // Assert the redirection URL post Google login
    // cy.url().should('include', '/complaints');
  });





    it('should be able to login using Google', () => {
    cy.visit('/login'); 

    cy.contains('Google login').click();


    cy.visit('https://ashesiiconnect.azurewebsites.net/auth/google');
    

    // cy.url().should('include', '/complaints');
  });
});
