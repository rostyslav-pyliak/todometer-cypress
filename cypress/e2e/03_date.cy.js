describe('date', () => {
  it('displays the corret date info', () => {
    cy.clock(new Date(1992, 9, 3))

    cy.visit('baseUrl')

    cy.reload()

    cy.getByTestId('day').should('have.text', '3')
    cy.getByTestId('year').should('have.text', '1992')
    cy.getByTestId('month').should('have.text', 'Oct')
    cy.getByTestId('week-day').should('have.text', 'Saturday')
  });
});