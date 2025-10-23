// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to clear all cookies and local storage
Cypress.Commands.add('clearAppState', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
})

// Custom command to wait for network requests to complete
Cypress.Commands.add('waitForNetworkIdle', (timeout = 5000) => {
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      let requestCount = 0
      const startTime = Date.now()
      
      const checkIdle = () => {
        if (requestCount === 0 && Date.now() - startTime > timeout) {
          resolve()
        } else {
          setTimeout(checkIdle, 100)
        }
      }
      
      // Monitor fetch requests
      const originalFetch = win.fetch
      win.fetch = (...args) => {
        requestCount++
        return originalFetch.apply(win, args).finally(() => {
          requestCount--
        })
      }
      
      checkIdle()
    })
  })
})

// Custom command to take screenshot with custom name
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { capture: 'fullPage' })
})
