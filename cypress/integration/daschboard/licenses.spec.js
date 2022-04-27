/// <reference types="cypress" />

import { onDashboardLoad } from '../../support/page_objects/dashboard'

describe('Dashboard Suite', () => {
  beforeEach('login into Ercole App', () => {
    cy.ercoleLogin()
    onDashboardLoad.requestAlerts()
    cy.visit('/dashboard')
    cy.wait('@alerts')
  })

  context('Licenses Box', () => {
    it('box must have the correct name', () => {
      cy.get('[data-cy="licenses"]').then((text) => {
        expect(text).contain('Licenses')
      })
    })

    it('will assert if show full description button is working', () => {
      cy.get('[data-cy="licenses-full-desc"]').click()
      cy.get('[class="dialog modal is-active is-small"]')
        .find('[class="modal-card-title"]')
        .should('contain', 'Alert Description')
      cy.get('[class="modal-card-foot"]').contains('Close').click()
    })

    it('will check if the button info works', () => {
      cy.get('[data-cy="licenses-info-value"]')
        .invoke('text')
        .then((text) => {
          cy.get('[data-cy="licenses-info"]').click()
          cy.url().should('contain', '/alerts')
          cy.get('[data-cy="show-left-content"]').click()

          cy.get('[data-cy="alert-category"]')
            .find('select')
            .select('LICENSE')
            .should('contain', 'LICENSE')
          cy.get('[data-cy="alert-severity"]')
            .find('select')
            .select('INFO')
            .should('contain', 'INFO')

          cy.get('[data-cy="show-items"]').should('contain', text)
        })
    })

    it('will check if the button warning works', () => {
      cy.get('[data-cy="licenses-warn-value"]')
        .invoke('text')
        .then((text) => {
          cy.get('[data-cy="licenses-warn"]').click()
          cy.url().should('contain', '/alerts')
          cy.get('[data-cy="show-left-content"]').click()

          cy.get('[data-cy="alert-category"]')
            .find('select')
            .select('LICENSE')
            .should('contain', 'LICENSE')
          cy.get('[data-cy="alert-severity"]')
            .find('select')
            .select('WARNING')
            .should('contain', 'WARNING')

          cy.get('[data-cy="show-items"]').should('contain', text)
        })
    })

    it('will check if the button critical works', () => {
      cy.get('[data-cy="licenses-crit-value"]')
        .invoke('text')
        .then((text) => {
          cy.get('[data-cy="licenses-crit"]').click()
          cy.url().should('contain', '/alerts')
          cy.get('[data-cy="show-left-content"]').click()

          cy.get('[data-cy="alert-category"]')
            .find('select')
            .select('LICENSE')
            .should('contain', 'LICENSE')
          cy.get('[data-cy="alert-severity"]')
            .find('select')
            .select('CRITICAL')
            .should('contain', 'CRITICAL')

          cy.get('[data-cy="show-items"]').should('contain', text)
        })
    })

    it('will correctly mark alerts as read', () => {
      let total

      cy.get('[data-cy="licenses-crit-value"]')
        .invoke('text')
        .then((text) => {
          total = Number(text)
        })

      cy.get('[data-cy="licenses-id"]')
        .invoke('data', 'id')
        .then((firstId) => {
          cy.get('@alerts')
            .then(() => {
              cy.get('[data-cy="licenses-mark-as-read"]').click()

              cy.request({
                method: 'POST',
                url: `${Cypress.env('apiUrl')}alerts/ack`,
                headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: {
                  ids: [firstId],
                },
              }).then((res) => {
                total = total - 1
                expect(res.status).to.equal(204)
              })
            })
            .then(() => {
              cy.get('[data-cy="licenses-crit-value"]').should('contain', total)
            })
        })
    })
  })
})
