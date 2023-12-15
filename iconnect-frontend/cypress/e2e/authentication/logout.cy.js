describe('SideNav Component', () => {
  it('should log the user out when the logout button is clicked', () => {
    cy.intercept('POST', '/auth/logout', {
      statusCode: 200,
      body: 'Logout successful', 
    }).as('logoutRequest');

    // Visit the page containing the SideNav component
    cy.visit('/admin/people'); 

    cy.get('.text-app-white').click(); 

    // Wait for the logout request to be intercepted
    cy.wait('@logoutRequest').then((interception) => {
      // Validate the logout request status and message
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.equal('Logout successful');

    
      cy.url().should('include', '/home'); 
    });

    cy.contains('You Logged out').should('be.visible');
  });

});
