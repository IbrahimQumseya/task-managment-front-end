/* eslint-disable no-undef */
// home_page.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('The Home Page', () => {
  beforeEach(() => {
    cy.request('POST', '/auth/signin', {
      username: 'user12',
      password: 'hanna121212!S',
    })
      .its('body')
      .as('currentUser');
  });
  it('sets auth cookie when logging in via form submission', function () {
    const { accessToken } = this.currentUser;
    console.log(this.currentUser);
    cy.visit('http://localhost:3001/login');
    cy.get('input[name=email]').type(`user12`);

    cy.get('input[name=password]').type(`hanna121212!S{enter}`);

    cy.url().should('include', '/home');

    // cy.getCookie('your-session-cookie').should('exist');

    // cy.get('h1').should('contain', 'user12');
  });
});
