describe('Online Search API', () => {
  const baseUrl = "https://api.wellsitenavigator.xyz";
  const endpoint = '/v2/web/marker/online/search/45145611';
  let authToken;

  before(() => {
    // Get authorization token using custom command
    cy.apiLogin();
  });

  beforeEach(() => {
    // Get token from environment variable before each test
    authToken = Cypress.env('authToken');
  });

  it('should successfully get online search results with valid marker ID and auth token', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }).then((response) => {
      // Test Case 1: Verify successful response
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.headers['content-type']).to.include('application/json');
      
      // Verify response structure (adjust based on actual API response)
      if (response.body.data) {
        expect(response.body.data).to.exist;
      }
    });
  });

  it('should handle request with missing or invalid authorization token', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': 'Bearer invalid_token_12345'
      },
      failOnStatusCode: false
    }).then((response) => {
      // Test Case 2: Verify error handling for invalid/missing auth token
      // The API should return 401 Unauthorized or 403 Forbidden
      expect(response.status).to.be.oneOf([401, 403]);
      expect(response.body).to.exist;
    });
  });

  it('should return JSON body in response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }).then((response) => {
      // Test Case 3: Verify response returns JSON body
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      
      // Verify response body is a valid JSON object (not a string)
      expect(response.body).to.be.an('object');
      expect(() => JSON.parse(JSON.stringify(response.body))).to.not.throw();
      
      // Verify response body is not empty
      expect(response.body).to.not.be.null;
      expect(response.body).to.not.be.undefined;
    });
  });

  it('should return response within 2 seconds', () => {
    const startTime = Date.now();
    
    cy.request({
      method: 'GET',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      timeout: 2000 // Set timeout to 2 seconds
    }).then((response) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Test Case 4: Verify response time is within 2 seconds (2000ms)
      expect(response.status).to.eq(200);
      expect(responseTime).to.be.lessThan(2000);
      cy.log(`Response time: ${responseTime}ms`);
    });
  });
})
