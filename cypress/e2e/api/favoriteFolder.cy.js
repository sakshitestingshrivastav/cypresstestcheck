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
})
