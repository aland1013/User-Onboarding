/* cy global */

describe('My tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('User can type a name in the name input field', () => {
    cy.get('[data-cy="name"]').type('Adam').should('have.value', 'Adam');
  });

  it('User can type an email address in the email address input field', () => {
    cy.get('[data-cy="email"]').type('adam@gmail.com');
  });

  it('User can type a password in the password input field', () => {
    cy.get('[data-cy="password"]').type('asdf;lkjdlkj');
  });

  it('User can check the terms of service box', () => {
    cy.get('[data-cy="terms"]').check();
  });

  it('User can submit the form data', () => {
    cy.get('[data-cy="name"]').type('Adam');
    cy.get('[data-cy="email"]').type('adam@gmail.com');
    cy.get('[data-cy="password"]').type('asdf;lkjdlkj');
    cy.get('[data-cy="terms"]').check();
    cy.contains('submit').click();
  });

  it('Validation occurs when an input is left empty', () => {
    cy.get('[data-cy="name"]').type('Adam{backspace}{backspace}{backspace}{backspace}');
    cy.get('[data-cy="name-error-p"]').contains('name is a required field');
    cy.get('[data-cy="button"]').should('be.disabled');
  });

  it('A unique error message appears when user enters waffle@syrup.com email address', () => {
    cy.get('[data-cy="email"]').type('waffle@syrup.com');
    cy.get('[data-cy="email-error-p"]').contains('That email is already taken');
  });

  it('User can click on label to enter text in input field', () => {
    cy.get('[for="name"]').click().type('Adam');
    cy.get('[data-cy="name"]').should('have.value', 'Adam');
  })
});
