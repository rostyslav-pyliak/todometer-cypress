/// <reference types="Cypress" />

describe('todos', () => {
  it('adds todos', () => {
    cy.visit('baseUrl')
    cy.clearLocalStorage()

    cy.getByTestId('todo').should('have.length', 0)

    cy.getByTestId('add-todo-input').type('Learn Cypress!')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('add-todo-input').type('Find a job!')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('add-todo-input').type('Be happy!')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('todo').should('have.length', 3)

    cy.getByTestId('todo').children().first().should('have.text', 'Learn Cypress!')

    cy.getByTestId('pending-list').children().should('have.length', 3)
    cy.getByTestId('paused-list').children().should('have.length', 0)
    cy.getByTestId('completed-list').children().should('have.length', 0)
  });

  it('does not allow to add empty todos', () => {
    //should have 3 todos
    cy.getByTestId('todo').should('have.length', 3)
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('todo').should('have.length', 3)
  });

  it('puases todos', () => {
    cy.contains('Do Later').should('not.exist')
    cy.getByTestId('pause-button').eq(1).click()
    cy.contains('Do Later').should('exist')

    cy.getByTestId('pending-list').children().should('have.length', 2)
    cy.getByTestId('paused-list').children().should('have.length', 1)
    cy.getByTestId('completed-list').children().should('have.length', 0)
  });

  it('resumes todos', () => {
    cy.contains('Do Later').should('exist').click()
    cy.getByTestId('resume-button').click()
    cy.contains('Do Later').should('not.exist')

    cy.getByTestId('pending-list').children().should('have.length', 3)
    cy.getByTestId('paused-list').children().should('have.length', 0)
    cy.getByTestId('completed-list').children().should('have.length', 0)
  });

  it('completes todos', () => {
    cy.contains('Completed').should('not.exist')
    cy.getByTestId('complete-button').eq(2).click()
    cy.contains('Completed').should('exist')

    cy.getByTestId('pending-list').children().should('have.length', 2)
    cy.getByTestId('paused-list').children().should('have.length', 0)
    cy.getByTestId('completed-list').children().should('have.length', 1)
  });

  it('delete todos', () => {
    cy.contains('Be happy!').should('exist')
    cy.getByTestId('delete-button').eq(2).click()
    cy.contains('Be happy!').should('not.exist')

    cy.getByTestId('pending-list').children().should('have.length', 2)
    cy.getByTestId('paused-list').children().should('have.length', 0)
    cy.getByTestId('completed-list').children().should('have.length', 0)
  });

  it('allows users to reset the todo state manually', () => {
    // Rules:
    // 1. Paused items will move to Pending
    // 2. Completed items will be removed
    // 3. Pending items will remain unchanged

    // The reset button should not be visible unless user have 1 completed todo
    cy.getByTestId('reset-button').should('not.exist')

    // Add new todo
    cy.getByTestId('add-todo-input').type('Test Reset Command')
    cy.getByTestId('add-todo-button').click()

    cy.getByTestId('pending-list').children().should('have.length', 3)
    cy.getByTestId('paused-list').children().should('have.length', 0)
    cy.getByTestId('completed-list').children().should('have.length', 0)

    cy.getByTestId('complete-button').eq(1).click()
    cy.getByTestId('pause-button').eq(1).click()

    cy.getByTestId('reset-button').should('exist').click()

    cy.getByTestId('pending-list').children().should('have.length', 2)
    cy.getByTestId('paused-list').children().should('have.length', 0)
    cy.getByTestId('completed-list').children().should('have.length', 0)
  })
})