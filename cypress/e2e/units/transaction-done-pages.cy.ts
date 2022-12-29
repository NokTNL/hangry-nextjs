describe('Transaction done pages', () => {
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

    // Fill in all required details in correct format
    cy.findByRole('textbox', { name: /Your name/i }).type('Mr ABC')
    cy.findByRole('textbox', { name: /Email/i }).type('12345@email.com')
    cy.findByRole('checkbox', {
      name: /Terms and Conditions/i,
    }).check({
      force: true,
    })
  })
  it(`Should lead to 'trasaction done' page after order submission`, () => {
    cy.findByRole('button', { name: /place order/i }).click()
    // Wait until reaching the new page
    cy.findByText(/order received/i)
    cy.url().should(
      'match',
      new RegExp(`^${Cypress.config().baseUrl}/transaction-done/`)
    )
  })
  it.only('Should clear cart items after succesful order submission', () => {
    cy.findByRole('button', { name: /place order/i }).click()

    cy.findByText(/cart item count/i).should('contain', '0')
  })
  it('Should not allow user to go back to checkout page')
  //     cy.intercept('POST', '/api/transaction').as('post-transaction')
  it('Failure page')
})
