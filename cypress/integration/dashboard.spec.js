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

  it('will log out from ercole app', () => {
    cy.get('[data-navbar-username]').click()
    cy.get('[data-logout-button]').click()
    cy.url().should('contain', '/login')
  })

  it('will change app language to Italian', () => {
    cy.visit('/login')
    cy.get('[data-cy="locale-switcher"]').click()
    cy.get('[data-cy="it"]').click()
    cy.get('[data-cy="locale-switcher"]').click()
    cy.get('[data-cy="it"]').should('contain', 'Italiano')
  })

  it('will change app language to Portuguese', () => {
    cy.visit('/login')
    cy.get('[data-cy="locale-switcher"]').click()
    cy.get('[data-cy="pt-br"]').click()
    cy.get('[data-cy="locale-switcher"]').click()
    cy.get('[data-cy="pt-br"]').should('contain', 'Português')
  })

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
    }).as('dashboard')
    cy.wait('@dashboard')
    cy.get('@dashboard').then((res) => {
      expect(res.response.statusCode).to.equal(200)

      cy.get('[data-cy="agents-discovered-value"]')
        .find('div')
        .should('contain', res.response.body.technologies.total.hostsCount)

      cy.get('[data-cy="perc-compliance-value"]')
        .find('[class="percent__int"]')
        .should(
          'contain',
          Math.round(res.response.body.technologies.total.compliance * 100)
        )

      cy.get('[data-cy="perc-compliance-value"]')
        .find('[class="percent_sign"]')
        .should('contain', '%')
    })
  })
})
