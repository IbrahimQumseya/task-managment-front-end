/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

describe('testing navbar', () => {
  it('testing nav on login page', function () {
    cy.wait(1200);
    cy.visit('/login');
    cy.get('.css-1t6c9ts').should('be.visible');
    cy.get('.css-1t6c9ts').should('have.text', 'LoginRegister');
    cy.get('.css-1t6c9ts > :nth-child(2)').should('have.text', 'Register');
    cy.get('.css-1t6c9ts > :nth-child(2)').should('be.enabled');
    cy.get('.css-1t6c9ts > :nth-child(2)').should('be.visible');
    cy.get('.css-1t6c9ts > :nth-child(1)').should('be.visible');
    cy.get('.css-1t6c9ts > :nth-child(1)').should('be.enabled');
    cy.get('.css-1t6c9ts > :nth-child(1)').should('have.text', 'Login');
    cy.get('.css-1t6c9ts > :nth-child(1)').should('have.attr', 'type', 'button');
    cy.get('.css-binzgt').should('be.visible');
    cy.get('#username').should('be.visible');
    cy.get('#username').should('be.enabled');
    cy.get('#username').type('user12');
    cy.get('#password').should('be.enabled');
    cy.get('#password').should('be.visible');
    cy.get('#password').type('hanna121212!S');
    cy.get('.css-13i4rnv-MuiGrid-root > .MuiTypography-root').should('be.visible');
    cy.get('.MuiGrid-grid-xs-true > .MuiTypography-root').should('be.visible');
    cy.get('.css-13i4rnv-MuiGrid-root > .MuiTypography-root').should('have.text', "Don't have an account? Sign Up");
    cy.get('.MuiGrid-grid-xs-true').should('have.text', 'Forgot password?');
    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').should('be.enabled');
    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click();
    cy.wait(1200);
    cy.url().should('include', '/home');
  });

  it('testing navBar Home', () => {
    cy.visit('/home');
    cy.wait(1200);
    cy.get('.css-1t6c9ts > .MuiButton-root').should('be.visible');
    cy.get('.css-1t6c9ts > .MuiButton-root').should('be.enabled');
    cy.get('.css-1t6c9ts').should('be.visible');
    cy.get('.MuiAvatar-root').should('be.visible');
    cy.get('.css-13i4rnv-MuiGrid-root > .MuiTypography-root').should('not.exist');
    cy.get('.css-binzgt > .MuiTypography-root').should('have.text', 'Create A task');
    cy.get('.MuiAvatar-root').click();
    cy.get(':nth-child(4) > .MuiTypography-root').should('be.visible');
    cy.get(':nth-child(4) > .MuiTypography-root').click();
  });
  it('testing navBar Register', () => {
    cy.visit('/register');
    cy.wait(1200);
    cy.get('.css-1t6c9ts > :nth-child(1)').should('be.visible');
    cy.get('.css-1t6c9ts > :nth-child(2)').should('be.visible');
    cy.get('.css-1t6c9ts').should('be.visible');
    cy.get('.css-1083xa6-MuiTypography-root').should('be.visible');
    cy.get('.css-1t6c9ts').should('have.class', 'MuiBox-root');
    cy.get('#firstName').should('be.visible');
    cy.get('#firstName').should('be.enabled');
    cy.get('#lastName').should('be.visible');
    cy.get('#lastName').should('be.enabled');
    cy.get('#username').should('be.visible');
    cy.get('#username').should('be.enabled');
    cy.get('#email').should('be.visible');
    cy.get('#email').should('be.enabled');
    cy.get('#Password').should('not.be.checked');
    cy.get('#Password').should('be.enabled');
    cy.get('#Password').should('be.visible');
    cy.get('#passwordConform').should('not.be.checked');
    cy.get('#passwordConform').should('be.enabled');
    cy.get('#passwordConform').should('be.visible');
    cy.get('.PrivateSwitchBase-input').should('be.enabled');

    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').should('be.enabled');
    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').should('be.visible');
    cy.get('.MuiGrid-root > .MuiTypography-root').should('be.visible');
    cy.get('.MuiGrid-root > .MuiTypography-root').should('have.attr', 'href', '/login');
    cy.get('[data-testid="LockOutlinedIcon"]').should('be.visible');
    cy.get('.MuiTypography-h5').should('have.text', 'Sigh Up');
    cy.get('.MuiTypography-h5').should('be.visible');
    cy.get('#root').should('be.visible');
    cy.visit('/login');
  });
});
