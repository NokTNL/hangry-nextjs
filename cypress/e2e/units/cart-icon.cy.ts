describe(`Cart icon`, () => {
  it(`No items added, show '0' on cart icon `, () => {
    cy.visit('/stores')
    cy.findByText(/cart item count/i).should('contain', '0')
  })
  it(`Add one item, show '1' on cart icon`, () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Cappuccino/ }).click()
    cy.findByText(/cart item count/i).should('contain', '1')
  })
  it(`One menu item x 1 + One menu item x 2, show '3' on cart icon`, () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Cappuccino/ }).click()
    cy.findByRole('button', { name: /Expresso/ })
      .click()
      .click()
    cy.findByText(/cart item count/i).should('contain', '3')
  })
})
