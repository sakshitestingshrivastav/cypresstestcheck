// Import commands.js using ES2015 syntax:
import './commands'
import './selectors'

console.log("Hello")

Cypress.Commands.add('login', (email, password) => {
  cy.get('input[type="email"], input[name="email"], #email').type(email)
  cy.get('input[type="password"], input[name="password"], #password').type(password)
  cy.get('button[type="submit"], input[type="submit"], .login-btn, #login-btn').click()
})
