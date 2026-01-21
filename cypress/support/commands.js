Cypress.Commands.add('login', () => {
    cy.fixture('user').then((user) => {
      cy.session('user-session', () => {
      cy.visit('/')
      cy.get('[placeholder="Email"]')
        .type(user.email)
      cy.get('[placeholder="Password"]')
        .type(user.password)
      cy.get('button[aria-label="Sign In"]', { timeout: 15000 }).should('be.visible').click()
      cy.get('[alt="logo"]', { timeout: 15000 }).should('be.visible')
      cy.url().should('include', 'https://portal.wellsitenavigator.xyz/')
      cy.get('section.sidebar-section', { timeout: 20000 })
  .should('be.visible')

    })
  })
  })

// Custom command for API login - gets auth token and stores it
Cypress.Commands.add('apiLogin', () => {
  const baseUrl = "https://api.wellsitenavigator.xyz";
  
  cy.fixture('user').then((user) => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/v2/web/auth/login`,
      body: {
        email: user.email,
        password: user.password
      },
      failOnStatusCode: false
    }).then((response) => {
      // If first endpoint doesn't work, try alternative
      if (response.status !== 200) {
        return cy.request({
          method: 'POST',
          url: `${baseUrl}/v2/web/auth/login`,
          body: {
            email: user.email,
            password: user.password
          },
          failOnStatusCode: false
        });
      }
      return response;
    }).then((response) => {
      if (response.status === 200) {
        // Extract webSessionToken from response.data.webSessionToken
        const authToken = response.body.data?.webSessionToken;
        Cypress.env('authToken', authToken);
      }
    });
  });
})
  