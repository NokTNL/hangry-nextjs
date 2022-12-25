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
  it('Display correct subtotal', () => {
    cy.findByText(/Subtotal/i).should('contain', '£11.49')
  })
  it('Disallow order submission when nothing in the form is filled in', () => {
    cy.findByRole('textbox', { name: /Your name/i }).should('have.value', '')
    cy.findByRole('textbox', { name: /Email/i }).should('have.value', '')
    cy.findByRole('textbox', { name: /Phone no\./i }).should('have.value', '')
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).should(
      'not.be.checked'
    )
    cy.findByRole('button', { name: /place order/i }).should('be.disabled')
  })
  it('Place order button enabled when all the required fields are filled', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    cy.findByRole('textbox', { name: /Email/i }).type('abcde@email.com')
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).should('not.be.disabled')
  })
  it('Place order button disabled when required fields were filled and then erased', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    cy.findByRole('textbox', { name: /Email/i }).type('abcde@email.com')
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    // Erasing one of the fields
    cy.findByRole('textbox', { name: /Email/i }).clear()
    cy.findByRole('button', { name: /place order/i }).should('be.disabled')
    // Fill it back, try erasing another field
    cy.findByRole('textbox', { name: /Email/i }).type('abcde@email.com')
    cy.findByRole('textbox', { name: /Your name/i }).clear()
    cy.findByRole('button', { name: /place order/i }).should('be.disabled')
    // Fill it back, try unchecking T&C checkbox
    cy.findByRole('textbox', { name: /Your name/i }).type('Your NAME 456')
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).uncheck({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).should('be.disabled')
    // Check the checkbox again, then button enabled
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).should('not.be.disabled')
  })
  it('Optional field that has correct format does not enable placing order', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    // Email missing
    cy.findByRole('textbox', { name: /Phone no\./i }).type('123455678') // Optional field
    cy.findByRole('button', { name: /place order/i }).should('be.disabled')
  })
  it('Validate phone number format', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    cy.findByRole('textbox', { name: /Email/i }).type('abcde@email.com')
    cy.findByRole('textbox', { name: /Phone no\./i }).type('ABVD*&GIBU1') // Invalid phone number
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).should('be.disabled')
  })
  it('Validate email format', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    cy.findByRole('textbox', { name: /Email/i }).type('12345.a.com') // Invalid email
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).should('be.disabled')
  })
})
