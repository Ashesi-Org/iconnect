describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display the registration form', () => {
    cy.get('h2').should('contain', 'Get Started With Ashesi iConnect');
    cy.get('input[placeholder="fname"]').should('be.visible');
    cy.get('input[placeholder="lname"]').should('be.visible');
    cy.get('input[placeholder="email"]').should('be.visible');
    cy.get('input[placeholder="pword"]').should('be.visible');
    cy.get('input[placeholder="cpword"]').should('be.visible');
    cy.get('button').contains('Register').should('be.visible');
  });

  it('should display error messages for invalid input', () => {
    cy.get('button').contains('Register').click();
    cy.contains('Invalid email').should('be.visible');
    cy.contains('First Name cannot be empty').should('be.visible');
    cy.contains('Last Name cannot be empty').should('be.visible');
  });


  it('should display error messages for invalid password', () => {
    cy.get('input[placeholder="pword"]').type('ashesi');
    cy.get('input[placeholder="cpword"]').type('ashesi');
    cy.get('button').contains('Register').click();
    cy.contains('Invalid password').should('be.visible');
  });
  

  it('should display password mismatch message', () => {
    cy.get('input[placeholder="pword"]').type('password123');
    cy.get('input[placeholder="cpword"]').type('password1234');
    cy.contains('password do not match').should('be.visible');
  });

  it('should successfully register with valid details', () => {
    cy.intercept('POST', '/auth/local/signup').as('registerRequest');

    cy.get('input[placeholder="fname"]').type('John');
    cy.get('input[placeholder="lname"]').type('Doe');
    cy.get('input[placeholder="email"]').type('johndoe@gmail.com');
    cy.get('input[placeholder="pword"]').type('securePassword888');
    cy.get('input[placeholder="cpword"]').type('securePassword55444');

    cy.get('button').contains('Register').click();

    cy.wait('@registerRequest').then(({ response }) => {
      expect(response.statusCode).to.equal(200); 
      cy.url().should('include', '/login'); 
    });
  });

  it('should redirect to the login page when "Login" link is clicked', () => {
    cy.contains('Already have an account?').find('a').click();
    cy.url().should('include', '/login');
  });

});
