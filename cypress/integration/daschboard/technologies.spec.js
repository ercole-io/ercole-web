/// <reference types="cypress" />

import { onDashboardLoad } from '../../support/page_objects/dashboard'

describe('Dashboard Suite', () => {
  beforeEach('login into Ercole App', () => {
    cy.ercoleLogin()
    onDashboardLoad.requestDashboard()
    cy.visit('/dashboard')
    cy.wait('@dashboard')
  })

  context('Technologies Box', () => {
    it('box must gave the correct name', () => {
      cy.get('[data-cy="technologies"]')
        .find('h2')
        .then((text) => {
          expect(text).contain('Technologies')
        })
    })

    it('first technologie must have ercole logo', () => {
      cy.get('[data-cy="technologies"]')
        .find('.technologies-list')
        .first()
        .find('img')
        .invoke('attr', 'src')
        .should('contain', 'Cerchio-blu-cane-blu')
    })

    it('first technologie must have ercole name', () => {
      cy.get('[data-cy="technologies"]')
        .find('.technologies-list')
        .first()
        .find('.tech-name span')
        .should('contain', 'Ercole')
    })

    it('will render the exact number of technologies', () => {
      cy.get('@dashboard').then((techs) => {
        const techsCount = techs.response.body.technologies.technologies.length
        cy.get('[data-cy="technologies"]')
          .find('.technologies')
          .find('.technologies-list')
          .should('have.length', techsCount + 1)
      })
    })
  })
})
