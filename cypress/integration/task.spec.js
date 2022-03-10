/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

describe('Renders the tasks page', () => {
  const username = Cypress.env('validUserEmail');
  const password = Cypress.env('validUserPassword');
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
  it('createTask', function () {
    cy.url().should('include', '/home');
    cy.wait(1500);
    cy.get('#title').clear();
    cy.get('#title').type(`${Math.random().toString(32).substr(2, 32)}`);
    cy.get('#description').clear();
    cy.get('#description').type(`${Math.random().toString(32).substr(2, 32)}`);
    cy.get('#title').should('be.visible');
    cy.get('#description').should('be.visible');
    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();
    cy.get('.MuiContainer-maxWidthLg').click();
    cy.wait(1500);
    cy.get('.MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root').should('be.visible');
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(3)').should('be.visible');
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(4)').should('be.visible');
    cy.get('[data-testid="DeleteForeverIcon"]').should('be.visible');
    cy.get('[data-testid="KeyboardArrowDownIcon"]').should('be.visible');
    cy.get('.css-1t6c9ts > .MuiButton-root').should('be.enabled');
    cy.get('.css-1t6c9ts > .MuiButton-root').should('be.visible');
    cy.get('.MuiTableBody-root > :nth-child(17)').should('exist');
    cy.wait(1500);
    cy.url().should('include', '/home');
  });

  it('delete', function () {
    cy.visit('/home');
    cy.wait(1500);
    cy.get(
      ':nth-child(17) > .MuiTableCell-alignRight > .css-1okj3ks-MuiStack-root > .MuiButtonBase-root > [data-testid="DeleteForeverIcon"] > path'
    ).click();
    cy.get(':nth-child(15) > .MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > :nth-child(2)').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').should('be.visible');
    cy.get('#alert-dialog-description').should('be.visible');
    cy.get('#alert-dialog-title').should('be.visible');
    cy.get('.MuiDialogActions-root > :nth-child(1)').should('be.enabled');
    cy.get('.MuiDialogActions-root > :nth-child(2)').should('be.enabled');
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.get('.MuiTableBody-root > :nth-child(17)').should('not.exist');
    cy.wait(1500);
  });
});
