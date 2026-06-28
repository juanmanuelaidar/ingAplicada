/* eslint-disable @typescript-eslint/no-namespace */

Cypress.Commands.add('loginByApi', (username = 'admin', password = 'admin') => {
  return cy
    .request({
      method: 'POST',
      url: '/api/authenticate',
      body: { username, password },
      failOnStatusCode: false,
    })
    .then(response => {
      expect(response.status, 'auth status').to.eq(200);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(response.body.id_token, 'JWT token').to.be.a('string').and.not.be.empty;

      const token = response.body.id_token;
      cy.window().then(win => {
        win.localStorage.setItem('jhi-authenticationToken', token);
      });

      return cy.wrap(token, { log: false }).as('jwtToken');
    });
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(username?: string, password?: string): Cypress.Chainable;
    }
  }
}

// Convert this to a module instead of a script (allows import/export)
export {};
