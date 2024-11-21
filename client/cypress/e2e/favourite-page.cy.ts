describe('favourites-card component e2e test', () => {
  beforeEach(() => {
    cy.visit('/favourites');
  });

  it('should fetch and display favourite event details',() => {
    cy.request('GET', 'http://localhost:3001/api/favourites' ).then((response) => {
      expect(response.status).to.eq(200);
      const event = response.body[0]; 
      
      cy.get('.event-card').should('be.visible');
      cy.get('.event-name').should('contain.text', event.eventDetails.name);
      cy.get('.event-date').should('contain.text', event.eventDetails.dates.start.localDate);
      cy.get('.event-time').should('contain.text', event.eventDetails.dates.start.localTime);
      cy.get('.event-venue').should('contain.text', event.eventDetails._embedded.venues[0].name);
      cy.get('.event-image').should('have.attr', 'src', event.eventDetails.images[0].url)
  })
})
})