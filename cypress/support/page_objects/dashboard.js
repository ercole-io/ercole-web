export class Dashboard {
  interceptMethod(name) {
    cy.intercept('GET', `**/${name}`, {
      fixture: `${name}.json`,
    }).as(`${name}`)
  }
}

export const onDashboardLoad = new Dashboard()
