describe('Favorites Markers API', () => {
  const baseUrl = "https://api.wellsitenavigator.xyz";
  const endpoint = '/rest/markers/favorites';
  let authToken;

  before(() => {
    // Get authorization token using custom command
    cy.apiLogin();
  });

  beforeEach(() => {
    // Get token from environment variable before each test
    authToken = Cypress.env('authToken');
  });

  it('should successfully get favorites markers with valid userId', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      qs: {
        userId: 1003705,
        allowUnlimited: true
      }
    }).then((response) => {
      // Test Case 1: Verify successful response
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('should handle request with missing userId parameter', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      qs: {
        allowUnlimited: true
      },
      failOnStatusCode: false
    }).then((response) => {
      // Test Case 2: Verify error handling for missing userId
      // The API might return 400 or 404, we just verify it handles the error
      expect(response.status).to.be.oneOf([400, 404, 500]);
    });
  });
})

