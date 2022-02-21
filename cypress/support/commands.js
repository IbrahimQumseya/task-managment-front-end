// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
<<<<<<< HEAD
=======

import jwtDecode from 'jwt-decode';

Cypress.Commands.add('loginByAuth0Api', (username, password) => {
  cy.log(`Logging in as ${username}`);

  cy.request({
    method: 'POST',
    url: `https://${Cypress.env('auth0_domain')}/signin`,
    body: {
      grant_type: 'password',
      username,
      password,
    },
  }).then(({ body }) => {
    const claims = jwtDecode(body.id_token);
    const { username, exp } = claims;

    const item = {
      body: {
        ...body,
        decodedToken: {
          claims,
          user: {
            username,
          },
          exp,
        },
      },
    };

    window.localStorage.setItem('auth0Cypress', JSON.stringify(item));

    cy.visit('/');
  });
});
>>>>>>> main
