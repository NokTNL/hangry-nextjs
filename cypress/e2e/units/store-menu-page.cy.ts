describe('Store Menu Page', () => {
  it('Returns 404 if store Id does not exist', () => {
    cy.request({
      url: '/stores/1827b6123497217641927098',
      failOnStatusCode: false,
    })
      .its('status')
      .should('equal', 404)
  })
  it('Renders the menu items details as buttons', () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()

    cy.findByRole('button', { name: /Cappuccino/ }).within($button => {
      cy.findByRole('img')
        .should('have.attr', 'src')
        .and('match', /starbucks-cappuccino.jpeg/)
      cy.findByText('£3.50').should('exist')
    })

    cy.findByRole('button', { name: /Expresso/ }).within($button => {
      cy.findByRole('img')
        .should('have.attr', 'src')
        .and('match', /starbucks-expresso.webp/)
      cy.findByText('£2.00').should('exist')
    })
  })
  it('Add one item, shows confirmation modal', () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()

    cy.findByRole('button', { name: /Expresso/ }).click()
    cy.findByRole('status').should('contain', 'Expresso added to cart')
  })
})
