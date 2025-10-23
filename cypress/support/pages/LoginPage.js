import { loginSelectors } from '../selectors.js'

class LoginPage {
  // Navigate to login page
  visit() {
    cy.visit('/')
  }

  // Enter email
  enterEmail(email) {
    cy.get(loginSelectors.emailInput).clear().type(email)
  }

  // Enter password
  enterPassword(password) {
    cy.get(loginSelectors.passwordInput).clear().type(password)
  }

  // Click login button
  clickLoginButton() {
    cy.get(loginSelectors.loginButton).click()
  }

  // Perform login
  login(email, password) {
    this.enterEmail(email)
    this.enterPassword(password)
    this.clickLoginButton()
  }

  // Check for error message
  getErrorMessage() {
    return cy.get(loginSelectors.errorMessage)
  }

  // Check if error message is visible
  isErrorMessageVisible() {
    return cy.get(loginSelectors.errorMessage).should('be.visible')
  }

  // Check if login button is enabled
  isLoginButtonEnabled() {
    return cy.get('[aria-label="Sign In"]').should('be.enabled')
  }

  // Check for loading spinner
  isLoadingSpinnerVisible() {
    return cy.get(loginSelectors.loadingSpinner).should('be.visible')
  }

  // Wait for page to load
  waitForPageLoad() {
    cy.get(loginSelectors.emailInput).should('be.visible')
  }
}

export default new LoginPage()
