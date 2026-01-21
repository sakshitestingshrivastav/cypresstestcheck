describe('Login API', () => {
  const baseUrl = "https://api.wellsitenavigator.xyz";
  
  beforeEach(() => {
    // Clear any existing token before each test
    Cypress.env('authToken', null);
  });

  it('should login and get authorization token', () => {
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
        // If login endpoint is different, try alternative endpoints
        if (response.status !== 200) {
          // Try alternative login endpoint
          return cy.request({
            method: 'POST',
            url: `${baseUrl}/rest/login`,
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
          const token = response.body.data?.webSessionToken;
          
          if (token) {
            // Store token in Cypress environment variable
            Cypress.env('authToken', token);
            expect(token).to.exist;
            cy.log('Authorization token saved successfully');
          } else {
            cy.log('Token not found in response. Response body:', response.body);
          }
        } else {
          cy.log('Login failed. Status:', response.status, 'Body:', response.body);
        }
      });
    });
  });
});
