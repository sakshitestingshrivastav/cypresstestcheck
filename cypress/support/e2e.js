// Import commands.js using ES2015 syntax:
import './commands'
import './selectors'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add custom commands for better test organization
Cypress.Commands.add('login', (email, password) => {
  cy.get('input[type="email"], input[name="email"], #email').type(email)
  cy.get('input[type="password"], input[name="password"], #password').type(password)
  cy.get('button[type="submit"], input[type="submit"], .login-btn, #login-btn').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.user-profile, .profile-menu, [data-testid="user-menu"]').length > 0) {
      cy.get('.user-profile, .profile-menu, [data-testid="user-menu"]').click()
      cy.get('button:contains("Logout"), a:contains("Logout"), .logout').click()
    }
  })
})

// Add custom assertion for better error handling
Cypress.Commands.add('shouldShowError', (errorMessage) => {
  cy.get('.error, .alert-danger, .invalid-feedback, [role="alert"]')
    .should('be.visible')
    .and('contain', errorMessage)
})
