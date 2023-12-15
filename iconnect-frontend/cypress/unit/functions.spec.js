describe('useFirebaseStorage Hook', () => {
  it('should upload an image and fetch its URL', () => {
    cy.visit('/your-page-containing-the-hook'); 

    cy.intercept('GET', '/images/*').as('getImage');
    cy.fixture('test-image.jpg').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName: 'test-image.jpg',
        mimeType: 'image/jpeg',
      });
    });

    cy.wait(500); 

    cy.wait('@getImage').then((interception) => {
      const imageUrl = interception.response.body; 
      expect(imageUrl).to.contain('images/'); 
    });
  });

});
