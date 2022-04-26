/// <reference types="cypress" />

describe('Login Suite', () => {
  it('will log in into ercole app', () => {
    cy.ercoleLogin()
  })
})
