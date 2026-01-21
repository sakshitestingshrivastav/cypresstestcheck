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
})
