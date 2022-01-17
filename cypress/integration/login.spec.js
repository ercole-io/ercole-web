/// <reference types="cypress" />

describe('Login Suite', () => {
  it('will log in into ercole app', () => {
    cy.visit('/login')
    cy.get('[data-username]').type(Cypress.env('username'))
    cy.get('[data-password]').type(Cypress.env('password'))
    cy.get('[data-submit]').click()
    cy.url().should('contain', '/dashboard')
  })
})
