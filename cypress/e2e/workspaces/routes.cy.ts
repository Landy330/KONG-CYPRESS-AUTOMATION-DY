import RoutesPage from "../../page/routes_page";
import { deleteRouteById } from "../../utils/route_apis";
import { createServiceDefault, deleteServiceById } from "../../utils/service_apis"


type routeConfigType = {
    name: string,
    path: string[]
}



describe('Routes Page Tests', () => {
    let addRouteId: string;
    let routeIdToDelete: string | undefined;
    const routePage = new RoutesPage()
    let routeConfig: routeConfigType[]
    before(() => {
        cy.fixture('route_config.json').then((routes) => {
            routeConfig = routes
        })
        // prepare test data
        createServiceDefault("add-route", "https://ga-add.route.com").then((body) => {
            addRouteId = body.id
        })

    })

    beforeEach(() => {
        cy.visit(routePage.routesUrl)
    })

    it('Add a route to the specific service', () => {
        cy.visit(routePage.routesUrl)
        routePage.createNewRouteToService({ ...routeConfig[0], "serviceId": addRouteId })

    })
    after(() => {
        cy.get(`[data-testid=${routeConfig[0].name}]`).then((ele) => {
            routeIdToDelete = ele.attr('data-rowid')
        })
        if (routeIdToDelete) {
            deleteRouteById(routeIdToDelete)
        }
        deleteServiceById(addRouteId)
    })
})