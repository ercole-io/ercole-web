/// <reference types="cypress" />

describe('Dashboard Suite', () => {
  beforeEach('login into Ercole App', () => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}settings/technologies`, {
      fixture: 'technologies.json',
    }).as('technologies')

    cy.ercoleLogin()
  })

  it('will load technologies api correctly', () => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}settings/technologies`, {
      fixture: 'technologies.json',
    }).as('technologies')
    cy.wait('@technologies')
    cy.get('@technologies').then((res) => {
      expect(res.response.statusCode).to.equal(200)
    })

    cy.intercept('GET', `${Cypress.env('apiUrl')}alerts?status=NEW`, {
      fixture: 'alerts.json',
    }).as('alerts')
    cy.wait('@alerts')
    cy.get('@alerts').then((res) => {
      expect(res.response.statusCode).to.equal(200)
    })
  })

  // it('will load alerts api correctly', () => {
  //   cy.intercept('GET', `${Cypress.env('apiUrl')}alerts?status=NEW`, {
  //     fixture: 'alerts.json',
  //   }).as('alerts')
  //   cy.wait('@alerts')
  //   cy.get('@alerts').then((res) => {
  //     expect(res.response.statusCode).to.equal(200)
  //   })
  // })

  // it('will load license-history api correctly', () => {
  //   cy.intercept('GET', '**/license-history', {
  //     fixture: 'license-history.json',
  //   }).as(`license-history`)
  //   cy.wait('@license-history')
  //   cy.get('@license-history').then((res) => {
  //     expect(res.response.statusCode).to.equal(200)
  //   })
  // })

  // it('Visits the app root url', () => {
  //   cy.get('[class="card notification"]')
  // })
})
