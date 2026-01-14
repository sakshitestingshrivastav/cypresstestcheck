import '../support/commands'

describe('template spec', () => {
  it('first test case', () => {
    cy.login()
    cy.url().should('include', '/search')
  })
})