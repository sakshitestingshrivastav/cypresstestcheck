describe('Logout', () => {
    it('Logout', () => {
cy.login()
      cy.get('i[class="text-[26px] icon-location"]').click()
     cy.url().should('include', 'https://portal.wellsitenavigator.xyz/dashboard/map/pins')
      cy.get('section.pins-section').find('h1').should('contain.text', 'My Pins')
      cy.get('nav.sidebar').find('.avatar-initials', { timeout: 15000 }).should('be.visible').click()
cy.get('[class="logout"]', { timeout: 15000 }).should('be.visible').click()
cy.url().should('include', 'https://portal.wellsitenavigator.xyz/dashboard/login')   
    })
})