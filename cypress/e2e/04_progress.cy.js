describe('date', () => {
  it('displays the corret date info', () => {
    cy.visit('baseUrl')

    cy.getByTestId('todo').should('have.length', 0)

    //add 4 todos
    cy.getByTestId('add-todo-input').type('Learn Cypress!')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('add-todo-input').type('Find a job!')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('add-todo-input').type('Kill russian!')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('add-todo-input').type('Be happy!')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('complete-button').eq(0).click()
    cy.getByTestId('complete-button').eq(0).click()
    cy.getByTestId('pause-button').eq(1).click()

    // Width of the progress bar
    cy.getByTestId('progress-container').invoke('width').then(width => {
      cy.getByTestId('complete-progress').should('have.css', 'width').and('eq', `${width * 0.5}px`)
      cy.getByTestId('pause-progress').should('have.css', 'width').and('eq', `${width * 0.75}px`)
    })
  });
});