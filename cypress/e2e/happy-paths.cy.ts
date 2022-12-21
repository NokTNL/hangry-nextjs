describe('empty spec', () => {
  it('Happy path (until shopping cart)', () => {
    // Stores pages
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()
    // Starbucks store menu page
    cy.findByRole('button', { name: /Cappuccino/ }).click()
    cy.findByRole('button', { name: /Expresso/ }).click()
    cy.findByRole('button', { name: /Expresso/ }).click()
    cy.go('back')
    // Stores page
    cy.findByRole('link', { name: /Burger King/ }).click()
    // Burger King store menu page
    cy.findByRole('button', { name: /Chicken Royal/ }).click()
    cy.findByRole('button', { name: /Chicken Royal/ }).click()
    cy.findByRole('button', { name: /Chicken Royal/ }).click()
    cy.findByRole('link', { name: /cart/i }).click()
    // Cart page
    cy.findByText(/Subtotal:/i).contains(/£29\.97/i) // Remove this later
  })
})
