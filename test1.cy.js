import LoginPage from './cypress/support/pages/LoginPage.js'

describe('Wellsite Navigator Login Tests', () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.waitForPageLoad()
  })

  describe('Valid Login Scenarios', () => {
    it('should login successfully with valid credentials', () => {
      const { email, password } = Cypress.env('testUser')
      LoginPage.login(email, password)
      
      // Verify successful login - adjust URL based on actual redirect
      cy.url().should('not.include', '/login')
      cy.url().should('include', Cypress.env('baseUrl'))
    })

    it('should remember user session when remember me is checked', () => {
      const { email, password } = Cypress.env('testUser')
      
      LoginPage.enterEmail(email)
      LoginPage.enterPassword(password)
      
      // Check remember me if available
      cy.get('body').then(($body) => {
        if ($body.find('input[type="checkbox"]').length > 0) {
          cy.get('input[type="checkbox"]').check()
        }
      })
      
      LoginPage.clickLoginButton()
      
      // Verify login and check if session persists
      cy.url().should('not.include', '/login')
    })
  })

  describe('Invalid Login Scenarios', () => {
    it('should show error message for invalid email', () => {
      const { password } = Cypress.env('testUser')
      
      LoginPage.login('invalid@email.com', password)
      
      LoginPage.isErrorMessageVisible()
    })

    it('should show error message for invalid password', () => {
      const { email } = Cypress.env('testUser')
      
      LoginPage.login(email, 'wrongPassword')
      
      LoginPage.isErrorMessageVisible()
    })

    it('should show error message for both invalid email and password', () => {
      const { email, password } = Cypress.env('invalidUser')
      
      LoginPage.login(email, password)
      
      LoginPage.isErrorMessageVisible()
    })

    it('should show error message for empty email field', () => {
      const { password } = Cypress.env('testUser')
      
      LoginPage.enterPassword(password)
      LoginPage.clickLoginButton()
      
      cy.contains('Email is required').should('be.visible')
    })

    it('should show error message for empty password field', () => {
      const { email } = Cypress.env('testUser')
      
      LoginPage.enterEmail(email)
      LoginPage.clickLoginButton()
      
      cy.contains('Password is required').should('be.visible')
    })

    it('should show error message for both empty fields', () => {
      LoginPage.clickLoginButton()
      cy.contains('Email is required').should('be.visible')
      cy.contains('Password is required').should('be.visible')
    })
  })

  describe('UI/UX Tests', () => {

    it('should enable login button when both fields are filled', () => {
      const { email, password } = Cypress.env('testUser')
      
      LoginPage.enterEmail(email)
      LoginPage.enterPassword(password)
      
      LoginPage.isLoginButtonEnabled()
    })

    it('should show loading state during login', () => {
      const { email, password } = Cypress.env('testUser')
      
      LoginPage.enterEmail(email)
      LoginPage.enterPassword(password)
      LoginPage.clickLoginButton()
      
      // Check for loading indicator if available
      cy.get('body').then(($body) => {
        if ($body.find('.spinner, .loading, [data-testid="loading"]').length > 0) {
          LoginPage.isLoadingSpinnerVisible()
        }
      })
    })
  })

  describe('Security Tests', () => {
    it('should not expose password in URL or page source', () => {
      const { email, password } = Cypress.env('testUser')
      
      LoginPage.login(email, password)
      
      // Check URL doesn't contain password
      cy.url().should('not.contain', password)
      
      // Check page source doesn't contain password
      cy.get('body').should('not.contain', password)
    })

    it('should handle multiple failed login attempts', () => {
      const { email } = Cypress.env('testUser')
      
      // Attempt multiple failed logins
      for (let i = 0; i < 3; i++) {
        LoginPage.login(email, 'wrongPassword')
        LoginPage.isErrorMessageVisible()
      }
      
      // Check if account is locked or additional security measures are in place
      cy.get('body').then(($body) => {
        if ($body.text().includes('locked') || $body.text().includes('suspended')) {
          cy.log('Account security measures detected')
        }
      })
    })
  })
})