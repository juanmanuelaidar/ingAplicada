// APIs/rutas consumidas por este test:
// - POST /api/authenticate: obtiene el JWT de sesion usando el helper cy.loginByApi.
// - POST /api/products: crea un producto autenticado con Authorization: Bearer <jwt>.

describe('Create product', () => {
  // Verifica el flujo E2E de creacion de un producto usando un usuario autenticado.
  // Primero obtiene el JWT por API y despues valida que POST /api/products cree el recurso.
  it('should create a product by API', () => {
    const productName = `Teclado-${Date.now()}`;

    cy.visit('/');
    cy.loginByApi('admin', 'admin');

    cy.get('@jwtToken').then(token => {
      cy.request({
        method: 'POST',
        url: '/api/products',
        headers: { Authorization: `Bearer ${token as any}` },
        body: {
          name: productName,
          price: 150.0,
          stock: 20,
        },
      }).then(response => {
        expect(response.status).to.eq(201);
        expect(response.body.name).to.eq(productName);
      });
    });
  });
});
