describe('Favorite Folder API', () => {
  const baseUrl = "https://api.wellsitenavigator.xyz";
  const endpoint = '/v2/web/favorite/folder';
  let authToken;

  before(() => {
    // Get authorization token using custom command
    cy.apiLogin();
  });

  beforeEach(() => {
    // Get token from environment variable before each test
    authToken = Cypress.env('authToken');
  });

  it('should successfully get favorite folders with valid auth token - Status 200', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }).then((response) => {
      // Test Case 1: Verify successful response with status 200
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.headers['content-type']).to.include('application/json');
      
      // Verify response structure (adjust based on actual API response)
      if (response.body.data) {
        expect(response.body.data).to.exist;
      }
    });
  });

  it('should return 401 Unauthorized for missing or invalid authorization token - Status 401', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': 'Bearer invalid_token_12345'
      },
      failOnStatusCode: false
    }).then((response) => {
      // Test Case 2: Verify error handling for invalid/missing auth token - Status 401
      expect(response.status).to.eq(401);
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
