describe('Stores page', () => {
  it('Renders store links with images', () => {
    cy.visit('/stores')

    cy.findByRole('link', { name: 'Starbucks' })
      .findByRole('img')
      .should('have.attr', 'src')
      .and('match', /starbucks.svg/)

    cy.findByRole('link', { name: 'Burger King' })
      .findByRole('img')
      .should('have.attr', 'src')
      .and('match', /burger-king.svg/)

    cy.findByRole('link', { name: 'McDonalds' })
      .findByRole('img')
      .should('have.attr', 'src')
      .and('match', /mcdonalds.svg/)
  })
  it('Clicks on store link leads to the stores page', () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: 'Starbucks' }).click()
    cy.url().should('match', /stores\/111111111111111111111111$/i)

    cy.go('back')
    cy.findByRole('link', { name: 'Burger King' }).click()
    cy.url().should('match', /stores\/222222222222222222222222$/i)
  })
})
