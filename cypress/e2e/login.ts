
describe("OrangeHRM Login", () => {

  it("Login with valid credentials", () => {

    cy.visit("/")

    cy.get('input[name="username"]').type("Admin")

    cy.get('input[name="password"]').type("admin123")

    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/dashboard")

  })

})