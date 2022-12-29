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
  it('Shows all items currently in the cart & correct subtotal', () => {
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
    cy.findByText(/Subtotal/i).should('contain', '£11.49')
  })
  it('Initially has empty order form and no error messages', () => {
    cy.findByRole('textbox', { name: /Your name/i }).should('have.value', '')
    cy.findByRole('textbox', { name: /Email/i }).should('have.value', '')
    cy.findByRole('textbox', { name: /Phone no\./i }).should('have.value', '')
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).should(
      'not.be.checked'
    )
    // No error messages in the beginning
    cy.get('[aria-live=polite]')
      .invoke('text')
      .should('not.match', /Your name is required/i)
      .should('not.match', /A valid email is required/i)
      .should('not.match', /The phone number must be valid/i)
      .should('not.match', /You must agree to the Terms and Conditions/i)
  })
  it('Disallow order submission when nothing in the form is filled in', () => {
    cy.findByRole('button', { name: /place order/i }).click()
    // All required fields have error message
    cy.get('[aria-live=polite]')
      .invoke('text')
      .should('match', /Your name is required/i)
      .should('match', /A valid email is required/i)
      .should('not.match', /The phone number must be valid/i) // Phone number is optional, so empty is okay
      .should('match', /You must agree to the Terms and Conditions/i)
    // Not submitting an order
    cy.findByRole('button', { name: /submitting order/i }).should('not.exist')
  })
  it('Can place order when all the required fields are filled', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    cy.findByRole('textbox', { name: /Email/i }).type('abcde@email.com')
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).click()
    cy.get('[aria-live=polite]')
      .invoke('text')
      .should('not.match', /Your name is required/i)
      .should('not.match', /A valid email is required/i)
      .should('not.match', /You must agree to the Terms and Conditions/i)
    // Button changed to 'Submitting order...'
    cy.findByRole('button', { name: /place order/i }).should('not.exist')
    cy.findByRole('button', { name: /submitting order/i })
      .should('exist')
      .should('be.disabled')
  })
  it('Cannot place order when required fields when one of the field is missing', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    // Email missing
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).click()
    cy.get('[aria-live=polite]')
      .invoke('text')
      .should('not.match', /Your name is required/i)
      .should('match', /A valid email is required/i)
      .should('not.match', /You must agree to the Terms and Conditions/i)
    // Fill email back, try clearing the name field
    cy.findByRole('textbox', { name: /Email/i }).type('abcde@email.com')
    cy.findByRole('textbox', { name: /Your name/i }).clear()
    cy.findByRole('button', { name: /place order/i }).click()
    cy.get('[aria-live=polite]')
      .invoke('text')
      .should('match', /Your name is required/i)
      .should('not.match', /A valid email is required/i)
      .should('not.match', /You must agree to the Terms and Conditions/i)
    // Fill the name back, try unchecking T&C checkbox
    cy.findByRole('textbox', { name: /Your name/i }).type('Your NAME 456')
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).uncheck({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).click()
    cy.get('[aria-live=polite]')
      .invoke('text')
      .should('not.match', /Your name is required/i)
      .should('not.match', /A valid email is required/i)
      .should('match', /You must agree to the Terms and Conditions/i)
    // Check the checkbox again, then an order can be placed
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).click()
    cy.get('[aria-live=polite]')
      .invoke('text')
      .should('not.match', /Your name is required/i)
      .should('not.match', /A valid email is required/i)
      .should('not.match', /You must agree to the Terms and Conditions/i)
    cy.findByRole('button', { name: /place order/i }).should('not.exist')
    cy.findByRole('button', { name: /submitting order/i })
      .should('exist')
      .should('be.disabled')
  })
  it('Optional field that has correct format does not enable placing order', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    // Email missing
    cy.findByRole('textbox', { name: /Phone no\./i }).type('123455678') // Optional field
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).click()
    cy.findByRole('button', { name: /submitting order/i }).should('not.exist')
  })
  it('Validate phone number format', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    cy.findByRole('textbox', { name: /Email/i }).type('abcde@email.com')
    cy.findByRole('textbox', { name: /Phone no\./i }).type('ABVD*&GIBU1') // Invalid phone number
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).click()
    cy.findByRole('button', { name: /submitting order/i }).should('not.exist')
  })
  it('Validate email format', () => {
    cy.findByRole('textbox', { name: /Your name/i }).type('MY NAME 1234')
    cy.findByRole('textbox', { name: /Email/i }).type('12345.a.com') // Invalid email
    cy.findByRole('checkbox', { name: /Terms and Conditions/i }).check({
      force: true,
    })
    cy.findByRole('button', { name: /place order/i }).click()
    cy.findByRole('button', { name: /submitting order/i }).should('not.exist')
  })
})
