/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */
describe('Renders the login page', () => {
  it('Renders correctly', () => {
    cy.visit('/login');
    cy.url().should('include', '/login');
  });

  it('Try login with invalid credentials', () => {
    cy.viewport('macbook-15');
    cy.visit('/login');
    cy.url().should('include', '/login');

    cy.get('#email').clear();
    cy.get('#email').type(`${Math.random().toString(20).substr(2, 16)}@test.com`);
    cy.get('#password').clear();
    cy.get('#password').type(`${Math.random().toString(20).substr(2, 16)}`);

    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();

    cy.wait(1200);
    cy.url().should('include', '/login');
  });

  it('Try login with valid credentials', () => {
    cy.viewport('macbook-15');
    cy.visit('/login');
    cy.url().should('include', '/login');

    cy.get('#email').clear();
    cy.get('#email').type(Cypress.env('validUserEmail'));
    cy.get('#password').clear();
    cy.get('#password').type(Cypress.env('validUserPassword'));
    
    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();

    cy.wait(1200);
    cy.url().should('include', '/home');
  });
});
