describe('Map', () => {
    it('Map', () => {
cy.login()
cy.get('img[alt="plus icon"]').should('be.visible').dblclick()
cy.get('img[alt="minus icon"]').should('be.visible').dblclick()
cy.get('img[alt="re-center route icon"]').should('be.visible').dblclick()
cy.get('img[alt="point icon"]').should('be.visible').click()
cy.get('img[alt="lock icon"]').should('be.visible').click()
cy.get('img[alt="settings icon"]').should('be.visible').click()    
    })
})