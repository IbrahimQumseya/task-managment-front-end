// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it('sadsad', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('/home');
  cy.get('.css-1t6c9ts > :nth-child(1)').click();
  cy.get('.css-1t6c9ts > :nth-child(1)').should('be.visible');
  cy.get('.css-1t6c9ts > :nth-child(2)').should('be.visible');
  cy.get('.css-1083xa6-MuiTypography-root').should('have.text', 'Logo');
  cy.get('.css-1t6c9ts').should('be.visible');
  cy.get('.css-1t6c9ts > :nth-child(2)').should('be.enabled');
  cy.get('.css-1t6c9ts > :nth-child(1)').should('be.enabled');
  cy.get('[data-testid="LanguageIcon"] > path').should('be.visible');
  cy.get('[data-testid="LanguageIcon"] > path').click();
  cy.get('.css-svhoug-MuiModal-root-MuiPopover-root-MuiMenu-root > .MuiPaper-root > .MuiList-root > [tabindex="0"] > .MuiTypography-root').should('be.visible');
  cy.get('.css-svhoug-MuiModal-root-MuiPopover-root-MuiMenu-root > .MuiPaper-root > .MuiList-root > [tabindex="-1"] > .MuiTypography-root').should('be.visible');
  cy.get('.css-svhoug-MuiModal-root-MuiPopover-root-MuiMenu-root > .MuiBackdrop-root').click();
  cy.get('#username').clear();
  cy.get('#username').type('user12');
  cy.get('#password').clear();
  cy.get('#password').type('sdhkawhdoasidada2');
  cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();
  cy.get('.MuiAlert-message').click();
  cy.get('#root').click();
  cy.get('.MuiFormControlLabel-root > .MuiTypography-root').should('be.visible');
  cy.get('.PrivateSwitchBase-input').check();
  cy.get('.PrivateSwitchBase-input').should('be.checked');
  cy.get('.MuiGrid-grid-xs-true > .MuiTypography-root').should('be.visible');
  cy.get('.css-13i4rnv-MuiGrid-root > .MuiTypography-root').should('be.visible');
  cy.get('#username').click();
  cy.get('#root').click();
  cy.get('#password').clear();
  cy.get('#root').click();
  cy.get('#password').clear();
  cy.get('#password').type('hanna121212!S');
  cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();
  cy.get('.css-1t6c9ts').should('be.visible');
  cy.get('.css-1t6c9ts > .MuiButton-root').should('have.text', 'Home');
  cy.get('.css-1t6c9ts > .MuiButton-root').should('be.enabled');
  cy.get('.MuiAvatar-root').should('be.visible');
  cy.get('#title').should('be.enabled');
  cy.get('#title').should('be.visible');
  cy.get('#description').should('not.be.checked');
  cy.get('.css-binzgt').should('be.visible');
  cy.get('.MuiContainer-maxWidthLg').should('be.visible');
  cy.get(':nth-child(1) > .MuiTableCell-alignRight > .css-1okj3ks-MuiStack-root > .MuiButtonBase-root > [data-testid="DeleteForeverIcon"] > path').should('be.visible');
  cy.get('.MuiAvatar-root').click();
  cy.get(':nth-child(4) > .MuiTypography-root').click();
  cy.get('.MuiAvatar-root').click();
  cy.get(':nth-child(4) > .MuiTypography-root').click();
  cy.get('.MuiAvatar-root').click();
  cy.get(':nth-child(4) > .MuiTypography-root').click();
  cy.get('[data-testid="KeyboardArrowRightIcon"] > path').click();
  cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4)').should('be.visible');
  cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('be.visible');
  cy.get('.MuiAvatar-root').click();
  cy.get(':nth-child(4) > .MuiTypography-root').click();
  cy.get('.MuiAvatar-root').click();
  cy.get('.css-1t3k1b1-MuiModal-root-MuiPopover-root-MuiMenu-root > .MuiBackdrop-root').click();
  cy.get('.css-1t6c9ts').click();
  /* ==== End Cypress Studio ==== */
});
