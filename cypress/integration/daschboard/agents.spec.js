/// <reference types="cypress" />

import { onDashboardLoad } from '../../support/page_objects/dashboard'

describe('Dashboard Suite', () => {
  beforeEach('login into Ercole App', () => {
    cy.ercoleLogin()
    cy.visit('/dashboard')
  })

  context('Agents Box', () => {
    it('box must have the correct name', () => {
      cy.get('[data-cy="agents"]').then((text) => {
        expect(text).contain('Agents')
      })
    })

    it('will check box content text', () => {
      cy.get('[data-cy="agents-desc"]').should(
        'contain',
        'Agents which do not send data:'
      )
    })

    it('will check box content value', () => {
      cy.fixture('alerts').then(() => {
        cy.get('[data-stoped-agents]').should('contain', '2')
      })
    })

    it('will check if the button inpect works', () => {
      onDashboardLoad.requestAlerts()
      cy.get('@alerts').then(() => {
        cy.get('[data-stoped-agents]')
          .invoke('text')
          .then((text) => {
            cy.get('[data-inspect]').click()
            cy.url().should('contain', '/alerts')
            cy.get('[data-cy="show-left-content"]').click()

            cy.get('[data-cy="alert-category"]')
              .find('select')
              .select('AGENT')
              .should('contain', 'AGENT')

            cy.get('[data-cy="show-items"]').should('contain', text)
          })
      })
    })
  })
})
