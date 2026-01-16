describe('Navigation Links Testing', () => {
    it('clicking on side bar navigation links', () => {
      cy.login()
      cy.get('i[class="text-[26px] icon-search-focus"]', { timeout: 15000 }).should('be.visible').click()
      cy.get('i.icon-heart').should('be.visible').click()
      cy.url().should('include', 'https://portal.wellsitenavigator.xyz/dashboard/map/favorites')
      //cy.get('section.favorites-section').find('h1').should('contain.text', 'Favorites')

     cy.get('i[class="text-[26px] icon-location"]', { timeout: 15000 }) .should('be.visible').click()
     cy.url().should('include', 'https://portal.wellsitenavigator.xyz/dashboard/map/pins')
      cy.get('section.pins-section').find('h1').should('contain.text', 'My Pins')
    })
})