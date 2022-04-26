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

Cypress.Commands.add('ercoleLogin', () => {
  const username = Cypress.env('username')
  const password = Cypress.env('password')

  cy.session(
    [username, password],
    () => {
      cy.visit('/login')
      cy.get('[data-username]').type(Cypress.env('username'))
      cy.get('[data-password]').type(Cypress.env('password'))
      cy.get('[data-submit]').click()

      cy.url().should('contain', '/dashboard')
    },
    {
      validate() {
        cy.request('/api/user').its('status').should('eq', 200)
      },
    }
  )
})
