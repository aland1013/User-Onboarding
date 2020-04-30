/* cy global */

describe('My tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Gets the name input and types a name in it', () => {
    cy.get('[data-cy="name"]').type('Adam');
  })
})