/* eslint-disable @typescript-eslint/no-namespace */

Cypress.Commands.add('getEntityHeading', (entityName: string) => cy.get(`[data-cy="${entityName}Heading"]`));

declare global {
  namespace Cypress {
    interface Chainable {
      getEntityHeading(entityName: string): Cypress.Chainable;
    }
  }
}

// Convert this to a module instead of a script (allows import/export)
export {};
