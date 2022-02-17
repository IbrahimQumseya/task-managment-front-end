/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */
describe('auth', () => {
  const password = `${Math.random().toString(20).substr(2, 16)}!D`;
  const username = `${Math.random().toString(20).substr(2, 16)}`;
  console.log(username);
  it('Renders with random credential', () => {
    cy.visit('/register');
    cy.url().should('include', '/register');
    cy.wait(1500);
    cy.get('#firstName').should('be.visible');
    cy.get('#firstName').should('be.enabled');
    cy.get('#firstName').clear();
    cy.get('#firstName').type(`${Math.random().toString(20).substr(2, 16)}`);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(`${Math.random().toString(20).substr(2, 16)}`);
    cy.get('#username').clear();
    cy.get('#username').type(username);
    cy.get('#username').should('have.id', 'username');
    cy.get('#email').clear();
    cy.get('#email').type(`${Math.random().toString(20).substr(2, 16)}@test.com`);
    cy.get('#Password').clear();
    cy.get('#Password').type(password);
    cy.get('#Password').should('be.enabled');
    cy.get('#passwordConform').click();
    cy.get('#passwordConform').should('be.enabled');
    cy.get('#passwordConform').should('be.visible');
    cy.get('#passwordConform').clear();
    cy.get('#passwordConform').type(password);
    cy.get('#root').click();
    cy.get('.PrivateSwitchBase-input').check();
    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();

    cy.wait(1500);
    cy.url().should('include', '/login');
  });

  it('Try login with invalid credentials', () => {
    cy.wait(1500);
    cy.viewport('macbook-15');
    cy.visit('/login');
    cy.url().should('include', '/login');

    cy.get('#username').clear();
    cy.get('#username').type(`${Math.random().toString(20).substr(2, 16)}@test.com`);
    cy.get('#password').clear();
    cy.get('#password').type(`${Math.random().toString(20).substr(2, 16)}`);

    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();
    cy.get('.MuiAlert-message').should('exist');
    cy.wait(1500);
    cy.url().should('include', '/login');
  });

  it('Try login with valid credentials', () => {
    cy.wait(1500);
    cy.viewport('macbook-15');

    cy.visit('/login');
    cy.url().should('include', '/login');

    cy.get('#username').clear();
    cy.get('#username').type(username);
    cy.get('#password').clear();
    cy.get('#password').type(password);

    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();

    cy.wait(1500);
    cy.url().should('include', '/home');
  });

  it('render logout', () => {
    cy.url().should('include', '/home');
    cy.get('.MuiAvatar-root').should('be.visible');
    cy.get('.MuiAvatar-root').click();
    cy.get(':nth-child(4) > .MuiTypography-root').should('be.visible');
    cy.get(':nth-child(4) > .MuiTypography-root').click();
    cy.wait(1500);
    cy.url().should('include', '/login');
  });
});
