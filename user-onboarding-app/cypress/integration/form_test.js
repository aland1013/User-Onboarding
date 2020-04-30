/* cy global */

describe('My tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Gets the name input and types a name in it', () => {
    cy.get('[data-cy="name"]').type('Adam').should('have.value', 'Adam');
  });

  it('Gets the email input and types an email address in it', () => {
    cy.get('[data-cy="email"]').type('adam@gmail.com');
  });

  it('Gets the password input and types a password in it', () => {
    cy.get('[data-cy="password"]').type('asdf;lkjdlkj');
  });

  it('Lets the user check the terms of service box', () => {
    cy.get('[data-cy="terms"]').check();
  });

  it('Lets the user submit the form data', () => {
    cy.get('[data-cy="name"]').type('Adam');
    cy.get('[data-cy="email"]').type('adam@gmail.com');
    cy.get('[data-cy="password"]').type('asdf;lkjdlkj');
    cy.get('[data-cy="terms"]').check();
    cy.contains('submit').click();
  })
})