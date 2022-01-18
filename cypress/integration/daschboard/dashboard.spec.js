/// <reference types="cypress" />

describe('Dashboard Suite', () => {
  beforeEach('login into Ercole App', () => {
    cy.ercoleLogin()

    // cy.intercept('GET', '**/technologies', {
    //   fixture: 'technologies.json',
    // }).as('technologies')
    // cy.wait('@technologies')
    // cy.get('@technologies').then((res) => {
    //   expect(res.response.statusCode).to.equal(200)
    // })
  })

  describe('Total Targets Box', () => {
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
      cy.intercept('GET', `${Cypress.env('apiUrl')}frontend/dashboard`, {
        fixture: 'dashboard.json',
      })

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

  describe('Agents Box', () => {
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
      cy.intercept('GET', `${Cypress.env('apiUrl')}alerts?status=NEW`, {
        fixture: 'alerts.json',
      }).as('alerts')

      cy.wait('@alerts').its('response.statusCode').should('eq', 200)
      cy.get('@alerts').then(() => {
        cy.get('[data-stoped-agents]').should('contain', '2')
      })
    })

    it('will check if the button works', () => {
      cy.get('[data-inspect]').click()
      cy.url().should('contain', '/alerts')
    })
  })

  describe('Licenses Box', () => {
    it('box must have the correct name', () => {
      cy.get('[data-cy="Licenses"]').then((text) => {
        expect(text).contain('Licenses')
      })
    })
  })
})
