describe('notifications', () => {
  it('displays 30 minute reminder if there are pending todos', () => {
    cy.visit(('baseUrl'), {
      onBeforeLoad(win) {
        cy.stub(win, 'Notification').as('Notification');
      },
    });

    cy.getByTestId('add-todo-input').type('Learn Cypress!')
    cy.getByTestId('add-todo-button').click()

    cy.clock(new Date(1606453199 * 1000))
    cy.get('@Notification').should('not.have.been.called')
    cy.tick(1000)
    cy.get('@Notification').should('have.been.calledWith', 'todometer reminder!')

    //Restore time
    cy.clock().then((clock) => {
      clock.restore()
    })
  });

  it('displays next day reset notifications', () => {
    cy.visit(('baseUrl'), {
      onBeforeLoad(win) {
        cy.stub(win, 'Notification').as('Notification');
      },
    });

    cy.getByTestId('add-todo-input').type('Learn Cypress!')
    cy.getByTestId('add-todo-button').click()
    cy.getByTestId('add-todo-input').type('Find a job!')
    cy.getByTestId('add-todo-button').click()
    cy.getByTestId('add-todo-input').type('Be happy!')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('pause-button').eq(0).click()
    cy.getByTestId('complete-button').eq(0).click()

    cy.getByTestId('pending-list').children().should('have.length', 1)
    cy.getByTestId('paused-list').children().should('have.length', 1)
    cy.getByTestId('completed-list').children().should('have.length', 1)

    cy.clock(new Date())
    cy.get('@Notification').should('not.have.been.called')
    //Jump to the next day
    cy.tick(86400000)
    cy.get('@Notification').should('have.been.calledWith', 'todometer reset time!')

    cy.getByTestId('pending-list').children().should('have.length', 2)
    cy.getByTestId('paused-list').children().should('have.length', 0)
    cy.getByTestId('completed-list').children().should('have.length', 0)
  });
});