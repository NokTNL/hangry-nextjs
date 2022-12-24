describe('Happy path', () => {
  it('Runs happy path (until shopping cart)', () => {
    // Stores pages
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()
    // Starbucks store menu page
    cy.findByRole('button', { name: /Cappuccino/ }).click()
    cy.findByRole('button', { name: /Expresso/ })
      .click()
      .click()
    cy.go('back')
    // Stores page
    cy.findByRole('link', { name: /Burger King/ }).click()
    // Burger King store menu page
    cy.findByRole('button', { name: /Chicken Royale/ })
      .click()
      .click()
      .click()
    cy.findByRole('link', { name: /cart/i }).click()
    // Cart page
    cy.findByRole('button', { name: /checkout/i }).click()
  })
})
