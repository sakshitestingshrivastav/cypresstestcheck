Cypress.Commands.add('login', () => {
    cy.fixture('user').then((user) => {
      cy.visit('/')
      cy.get('[placeholder="Email"]')
        .type(user.email)
      cy.get('[placeholder="Password"]')
        .type(user.password)
      cy.get('button[aria-label="Sign In"]', { timeout: 15000 }).should('be.visible').click()
      cy.get('[alt="logo"]', { timeout: 15000 }).should('be.visible')
      cy.url().should('include', 'https://portal.wellsitenavigator.xyz/')
    })
  })
  