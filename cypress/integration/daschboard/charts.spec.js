/// <reference types="cypress" />

import { onDashboardLoad } from '../../support/page_objects/dashboard'

describe('Dashboard Suite', () => {
  beforeEach('login into Ercole App', () => {
    cy.ercoleLogin()
    onDashboardLoad.requestLicensesHistory()
    cy.visit('/dashboard')
    cy.wait('@history')
  })

  context('Charts Box', () => {
    it('will check if License tab ist visible', () => {
      cy.get('[data-cy="licenses-tab"]').should('be.visible')
    })

    it('will select Core Hosts tab and back to Licenses tab', () => {
      cy.get('[role="tablist"]').find('li').not('.is-active').click()
      cy.get('[data-cy="corehosts-tab"]').should('be.visible')
      cy.get('[role="tablist"]').find('li').not('.is-active').click()
      cy.get('[data-cy="licenses-tab"]').should('be.visible')
    })

    it('will select a diferent license and dates and then reset to default', () => {
      cy.get('@history').then((hist) => {
        const toSelect =
          hist.response.body.licenseComplianceHistory[5].licenseTypeID

        cy.get('[data-cy="licenses-input"]').click()
        cy.get('.dropdown-menu')
          .find('.dropdown-content')
          .find('[class="dropdown-item"]')
          .find('b')
          .contains(toSelect)
          .click()
      })

      cy.get('[data-cy="licenses-start-date"]')
    })
  })
})
