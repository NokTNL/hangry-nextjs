describe('Checkout page', () => {
  beforeEach(() => {
    // Loading the cart with items
    cy.visit('/stores')

    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Expresso/ })
      .click()
      .click()
    cy.go('back')
    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ }).click()
    cy.findByRole('link', { name: /cart/i }).click()

    cy.findByRole('button', { name: /checkout/i }).click()
  })
  it('Shows all items currently in the cart', () => {
    cy.findByRole('listitem', { name: /Starbucks/ })
      .findByRole('listitem', { name: /Expresso/ })
      .within($item => {
        cy.findByText(/£2\.00/).should('exist') // price
        cy.findByText(/x\s*2/).should('exist') // quantity
      })
    cy.findByRole('listitem', { name: /Burger King/ })
      .findByRole('listitem', { name: /Chicken Royale/ })
      .within($item => {
        cy.findByText(/£7\.49/).should('exist') // price
        cy.findByText(/x\s*1/).should('exist') // quantity
      })
  })
})
