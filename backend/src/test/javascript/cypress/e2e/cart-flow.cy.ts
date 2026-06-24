describe('Cart flow', () => {
  it('should open shopping cart after API login', () => {
    cy.loginByApi('admin', 'admin');

    cy.visit('/shopping-cart');
    cy.url().should('match', /\/shopping-cart(\?.*)?$/);
    cy.getEntityHeading('ShoppingCart').should('be.visible');
  });
});
