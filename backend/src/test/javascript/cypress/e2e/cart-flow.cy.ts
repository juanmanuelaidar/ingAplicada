// APIs/rutas consumidas por este test:
// - POST /api/authenticate: obtiene el JWT de sesion usando el helper cy.loginByApi.
// - GET /shopping-cart: abre la pantalla web de carritos con el usuario autenticado.

describe('Cart flow', () => {
  // Verifica que un usuario autenticado puede entrar a la pantalla de carritos.
  // La prueba confirma la ruta final y que el encabezado de ShoppingCart se renderiza.
  it('should open shopping cart after API login', () => {
    cy.loginByApi('admin', 'admin');

    cy.visit('/shopping-cart');
    cy.url().should('match', /\/shopping-cart(\?.*)?$/);
    cy.getEntityHeading('ShoppingCart').should('be.visible');
  });
});
