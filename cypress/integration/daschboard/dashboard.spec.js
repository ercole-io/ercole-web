/// <reference types="cypress" />

import { onDashboardLoad } from '../../support/page_objects/dashboard'

describe('Dashboard Suite', () => {
  beforeEach('login into Ercole App', () => {
    cy.ercoleLogin()
  })

  context('Total Targets Box', () => {
    it('box must gave the correct name', () => {
      cy.get('[data-cy="total-targets"]')
        .find('h2')
        .then((text) => {
          expect(text).contain('Total Targets')
        })
    })

    it('will check box contents texts', () => {
      cy.get('[data-cy="agents-discovered"]').should(
        'contain',
        'Agents discovered'
      )

      cy.get('[data-cy="perc-compliance"]').should(
        'contain',
        'Percentage of compliance'
      )
    })

    it('will check box contents values', () => {
      onDashboardLoad.requestDashboard()

      cy.fixture('dashboard').then((file) => {
        cy.get('[data-cy="agents-discovered-value"]')
          .find('div')
          .should('contain', file.technologies.total.hostsCount)

        cy.get('[data-cy="perc-compliance-value"]')
          .find('[class="percent__int"]')
          .should(
            'contain',
            Math.round(file.technologies.total.compliance * 100)
          )

        cy.get('[data-cy="perc-compliance-value"]')
          .find('[class="percent_sign"]')
          .should('contain', '%')
      })
    })
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
      onDashboardLoad.requestAlerts()

      cy.fixture('alerts').then(() => {
        cy.get('[data-stoped-agents]').should('contain', '2')
      })
    })

    it('will check if the button inpect works', () => {
      cy.get('[data-inspect]').click()
      cy.url().should('contain', '/alerts')
    })
  })

  context('Licenses Box', () => {
    beforeEach('Request Alerts', () => {
      onDashboardLoad.requestAlerts()
    })

    it('box must have the correct name', () => {
      cy.get('[data-cy="Licenses"]').then((text) => {
        expect(text).contain('Licenses')
      })
    })

    it('will assert if show full description button is working', () => {
      cy.get('[data-cy="Licenses-full-desc"]').click()
      cy.get('[class="dialog modal is-active is-small"]')
        .find('[class="modal-card-title"]')
        .should('contain', 'Alert Description')
      cy.get('[class="modal-card-foot"]').contains('Close').click()
    })

    it.only('will check if the button info works', () => {
      cy.get('[data-cy="Licenses-info-value"]')
        .invoke('text')
        .then((text) => {
          cy.get('[data-cy="Licenses-info"]').click()
          cy.url().should('contain', '/alerts')

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
  })
})
