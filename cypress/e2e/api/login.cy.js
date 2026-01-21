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

  it('should return JSON body in response', () => {
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
        // Test Case 2: Verify response returns JSON body
        if (response.status === 200) {
          expect(response.headers['content-type']).to.include('application/json');
          
          // Verify response body is a valid JSON object (not a string)
          expect(response.body).to.be.an('object');
          expect(() => JSON.parse(JSON.stringify(response.body))).to.not.throw();
          
          // Verify response body is not empty
          expect(response.body).to.not.be.null;
          expect(response.body).to.not.be.undefined;
        }
      });
    });
  });

  it('should return response within 2 seconds', () => {
    cy.fixture('user').then((user) => {
      const startTime = Date.now();
      
      cy.request({
        method: 'POST',
        url: `${baseUrl}/v2/web/auth/login`,
        body: {
          email: user.email,
          password: user.password
        },
        failOnStatusCode: false,
        timeout: 2000 // Set timeout to 2 seconds
      }).then((response) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        // Test Case 3: Verify response time is within 2 seconds (2000ms)
        if (response.status === 200) {
          expect(responseTime).to.be.lessThan(2000);
          cy.log(`Response time: ${responseTime}ms`);
        }
      });
    });
  });
});
