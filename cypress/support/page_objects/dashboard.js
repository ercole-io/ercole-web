export class Dashboard {
  requestTechnologies() {
    cy.intercept('GET', `${Cypress.env('apiUrl')}settings/technologies`, {
      fixture: 'technologies.json',
    }).as('technologies')
    cy.wait('@technologies').its('response.statusCode').should('eq', 200)
  }

  requestDashboard() {
    cy.intercept('GET', `${Cypress.env('apiUrl')}frontend/dashboard`, {
      fixture: 'dashboard.json',
    }).as('dashboard')
    cy.wait('@dashboard').its('response.statusCode').should('eq', 200)
  }

  requestAlerts() {
    cy.intercept('GET', `${Cypress.env('apiUrl')}alerts?status=NEW`, {
      fixture: 'alerts.json',
    }).as('alerts')
    cy.wait('@alerts').its('response.statusCode').should('eq', 200)
  }
}

export const onDashboardLoad = new Dashboard()
