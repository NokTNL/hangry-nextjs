describe('Cart page', () => {
  it(`Add one item, display the item's full details in the cart, quantity = 1`, () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Cappuccino/ }).click()
    cy.findByRole('link', { name: /cart/i }).click()

    // Within Starbucks item
    cy.findByRole('listitem', {
      name: /Starbucks/i,
    })
      .findByRole('listitem', {
        name: /Cappuccino/,
      })
      .within($item => {
        cy.findByRole('img')
          .should('have.attr', 'src')
          .should('match', /starbucks-cappuccino.jpeg/)
        cy.findByRole('spinbutton', { name: /quantity/i }).should(
          'have.value',
          '1'
        )
        cy.findByText(/£3\.50/).should('exist')
      })
  })
  it(`Add same item twice, increment item's quantity to 2`, () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()
    // Click twice
    cy.findByRole('button', { name: /Cappuccino/ })
      .click()
      .click()
    cy.findByRole('link', { name: /cart/i }).click()

    cy.findByRole('listitem', {
      name: /Starbucks/i,
    })
      .findByRole('listitem', {
        name: /Cappuccino/,
      })
      .findByRole('spinbutton', { name: /quantity/i })
      .should('have.value', '2')
  })
  it('Added items from the same store grouped into one store, with all correct info', () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Starbucks/ }).click()
    // 2 Cappuccino, 3 Expresso
    cy.findByRole('button', { name: /Cappuccino/ })
      .click()
      .click()
    cy.findByRole('button', { name: /Expresso/ })
      .click()
      .click()
      .click()
    cy.findByRole('link', { name: /cart/i }).click()

    cy.findByRole('listitem', {
      name: /Starbucks/,
    }).within($storeItem => {
      // Cappuccino item
      cy.findByRole('listitem', { name: /Cappuccino/ }).within($item => {
        cy.findByRole('img')
          .should('have.attr', 'src')
          .should('match', /starbucks-cappuccino.jpeg/)
        cy.findByText(/£3\.50/).should('exist')
        cy.findByRole('spinbutton', { name: /quantity/i }).should(
          'have.value',
          '2'
        )
      })
      // Expresso item
      cy.findByRole('listitem', { name: /Expresso/ }).within($item => {
        cy.findByRole('img')
          .should('have.attr', 'src')
          .should('match', /starbucks-expresso.webp/)
        cy.findByText(/£2\.00/).should('exist')
        cy.findByRole('spinbutton', { name: /quantity/i }).should(
          'have.value',
          '3'
        )
      })
    })
  })
  it('Display titles of items grouped into multiple stores', () => {
    cy.visit('/stores')
    // Startbucks
    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Cappuccino/ }).click()
    cy.findByRole('button', { name: /Expresso/ })
      .click()
      .click()
    cy.go('back')
    // Burger King
    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ })
      .click()
      .click()

    cy.findByRole('link', { name: /cart/i }).click()

    cy.findByRole('listitem', { name: /Starbucks/ }).within($storeItem => {
      cy.findByRole('listitem', { name: /Cappuccino/ }).should('exist')
      cy.findByRole('listitem', { name: /Expresso/ }).should('exist')
    })
    cy.findByRole('listitem', { name: /Burger King/ }).within($storeItem => {
      cy.findByRole('listitem', { name: /Chicken Royale/ }).should('exist')
    })
  })
  it('Spinbutton changes item quantity', () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ }).click()
    cy.findByRole('link', { name: /cart/i }).click()

    cy.findByRole('listitem', { name: /Chicken Royale/ })
      .findByRole('spinbutton', {
        name: /quantity/i,
      })
      .clear()
      .type('100')

    cy.findByRole('listitem', { name: /Chicken Royale/ })
      .findByRole('spinbutton', {
        name: /quantity/i,
      })
      .should('have.value', '100')
  })
  it('Delete button shows confirmation modal, confirm, then delete item', () => {
    cy.visit('/stores')
    // Startbucks
    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Cappuccino/ }).click()
    cy.findByRole('button', { name: /Expresso/ }).click()

    cy.go('back')
    // Burger King
    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ }).click()

    cy.findByRole('link', { name: /cart/i }).click()

    cy.findByRole('listitem', { name: /Cappuccino/ })
      .findByRole('button', {
        name: /remove item/i,
      })
      .click()

    cy.findByRole('button', { name: /confirm/i }).click()

    // Target item removed
    cy.findByRole('listitem', { name: /Cappuccino/ }).should('not.exist')

    // Remaining items should still be in the document
    cy.findByRole('listitem', { name: /Expresso/ }).should('exist')
    cy.findByRole('listitem', { name: /Chicken Royale/ }).should('exist')
  })
  it('Persists cart items after reload', () => {
    cy.visit('/stores')
    // Startbucks
    cy.findByRole('link', { name: /Starbucks/ }).click()

    cy.findByRole('button', { name: /Expresso/ })
      .click()
      .click()
    cy.go('back')

    // Burger King
    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ })
      .click()
      .click()
      .click()

    // Go to Cart page
    cy.findByRole('link', { name: /cart/i }).click()

    cy.findByRole('listitem', { name: /Expresso/ })
      .findByRole('spinbutton', { name: 'quantity' })
      .should('have.value', 2)
    cy.findByRole('listitem', { name: /Chicken Royale/ })
      .findByRole('spinbutton', { name: 'quantity' })
      .should('have.value', 3)

    // Change item quantities & Delete another
    cy.findByRole('listitem', { name: /Expresso/ })
      .findByRole('spinbutton', { name: 'quantity' })
      .clear()
      .type('10')
    cy.findByRole('listitem', { name: /Chicken Royale/ })
      .findByRole('button', {
        name: /remove/i,
      })
      .click({ force: true })
    cy.findByRole('button', { name: /confirm/i }).click()

    // Reload, should still reflect the last cart state
    cy.reload()
    cy.findByRole('listitem', { name: /Expresso/ })
      .findByRole('spinbutton', { name: 'quantity' })
      .should('have.value', 10)
    cy.findByRole('listitem', { name: /Chicken Royale/ }).should('not.exist')
  })
  it(`Display correct subtotal value`, () => {
    cy.visit('/stores')
    // Startbucks
    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Cappuccino/ })
      .click()
      .click()
    cy.findByRole('button', { name: /Expresso/ })
      .click()
      .click()
      .click()
    cy.go('back')

    // Burger King
    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ })
      .click()
      .click()
      .click()
      .click()

    // Go to Cart page
    cy.findByRole('link', { name: /cart/i }).click()

    cy.findByText(/Subtotal/i).should('contain', '£42.96')
  })
  it('Disallow checkout when there are no items added in the cart', () => {
    cy.visit('/cart')
    cy.findByRole('button', { name: /checkout/i }).should('be.disabled')
  })
  it('Checkout button leads to checkout page when items are present in the cart', () => {
    cy.visit('/stores')

    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Expresso/ })
      .click()
      .click()
    cy.go('back')

    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ }).click()

    cy.findByRole('link', { name: /cart/i }).click()

    // Remove Chicken Royale, only Expresso left
    cy.findByRole('listitem', { name: /Chicken Royale/ })
      .findByRole('button', {
        name: /remove/i,
      })
      .click()
    cy.findByRole('button', { name: /confirm/i }).click()

    cy.findByRole('button', { name: /checkout/i }).click()

    cy.url().should('match', /checkout$/)
  })
  it.only('Checkout button disabled again if ALL items in the cart are later deleted', () => {
    cy.visit('/stores')
    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ }).click()
    cy.findByRole('link', { name: /cart/i }).click()

    // Allowed at first
    cy.findByRole('button', { name: /checkout/i }).should('not.be.disabled')

    cy.findByRole('listitem', { name: /Chicken Royale/ })
      .findByRole('button', {
        name: /remove/i,
      })
      .click()
    cy.findByRole('button', { name: /confirm/i }).click()
    cy.findByRole('button', { name: /checkout/i }).should('be.disabled')
  })
  it.only('Disallow checkout if any item has quantity = 0', () => {
    cy.visit('/stores')

    cy.findByRole('link', { name: /Starbucks/ }).click()
    cy.findByRole('button', { name: /Expresso/ }).click()
    cy.go('back')
    cy.findByRole('link', { name: /Burger King/ }).click()
    cy.findByRole('button', { name: /Chicken Royale/ }).click()

    cy.findByRole('link', { name: /cart/i }).click()

    // Allowed at first
    cy.findByRole('button', { name: /checkout/i }).should('not.be.disabled')

    cy.findByRole('listitem', { name: /Expresso/ })
      .findByRole('spinbutton', {
        name: /quantity/i,
      })
      .clear() // quantity = 0
    cy.findByRole('button', { name: /checkout/i }).should('be.disabled')
  })
})
