/// <reference types="cypress" />

describe('Header Suite', () => {
  beforeEach('login into Ercole App', () => {
    cy.ercoleLogin()
    cy.wait(5000)
  })

  it('will log out from ercole app', () => {
    cy.get('[data-navbar-username]').click()
    cy.get('[data-logout-button]').click()
    cy.url().should('contain', '/login')
  })

  it('will change app language to Italian', () => {
    cy.get('[data-cy="locale-switcher"]').click()
    cy.get('[data-cy="it"]').click()
    cy.get('[data-cy="locale-switcher"]').click()
    cy.get('[data-cy="it"]').should('contain', 'Italiano')
  })

  it('will change app language to Portuguese', () => {
    cy.get('[data-cy="locale-switcher"]').click()
    cy.get('[data-cy="pt-br"]').click()
    cy.get('[data-cy="locale-switcher"]').click()
    cy.get('[data-cy="pt-br"]').should('contain', 'Português')
  })
})
