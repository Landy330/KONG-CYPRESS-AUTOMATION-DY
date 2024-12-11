import BasePage from "./base_page";


type routeType = {
    serviceId: string,
    name: string,
    tags?: string,
    protocols?: string,
    path: string[]
}
class RoutesPage extends BasePage {
    
    constructor() {
        super()
    }
    // baseRoute: string = Cypress.env('baseRoute')
    routesUrl = "http://localhost:8002/default/routes"

    createNewRouteBtn = '[data-testid="new-route"]'
    routeNameInput = '[data-testid="route-form-name"]'
    serviceIdSelect = '[data-testid="route-form-service-id"]'
    pathInput1 = '[data-testid="route-form-paths-input-1"]'
    submitBtn = '[data-testid="route-form-submit"]'

    createNewRouteToService(routeConfig: routeType) {
        cy.get(this.createNewRouteBtn).click()

        cy.get(this.routeNameInput)
        .type(routeConfig.name)

        cy.get(this.serviceIdSelect).click()
        cy.get(`[data-testid="select-item-${routeConfig.serviceId}"]`).click()

        cy.get(this.pathInput1).type(routeConfig.path[0])

        cy.get(this.submitBtn).click()
    }
}

export default RoutesPage;