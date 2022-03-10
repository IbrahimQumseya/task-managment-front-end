// test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it('test adding task', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3001/home');
  cy.get('#username').clear();
  cy.get('#username').type('user12');
  cy.get('#password').clear();
  cy.get('#password').type('asdwasdwasd');
  // cy.get('.PrivateSwitchBase-input').clear();
  // cy.get('.PrivateSwitchBase-input').type('remember');
  // cy.get('.PrivateSwitchBase-input').check();
  cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();
  cy.get('.css-f779bt-MuiStack-root > .MuiPaper-root').should('be.visible');
  cy.get('#password').clear();
  cy.get('#password').type('hanna121212!S');
  cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();
  cy.get('#title').clear();
  cy.get('#title').type('sdhuwiasdwasd');
  cy.get('#description').clear();
  cy.get('#description').type('sadwasdwasd');
  cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').should('be.enabled');
  cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();
  cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
  cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
  cy.get('.MuiTablePagination-actions').click();
  cy.get('.MuiTablePagination-actions').click();
  // cy.get(':nth-child(19) > th.MuiTableCell-root').should('be.visible');
  // cy.get(':nth-child(19) > :nth-child(3)').should('be.visible');
  // cy.get(':nth-child(19) > th.MuiTableCell-root').should('be.visible');
  /* ==== End Cypress Studio ==== */
});
