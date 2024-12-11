import GatewayServicesPage from "../../page/gateway_services_page"
import { deleteAllServices, deleteServiceById } from "../../utils/service_apis";

const workSpacesPage = new GatewayServicesPage()
let serviceConfig: any;

describe("Gateway Services Page", () => {
    before(() => {
        cy.fixture('service_config.json')
            .then((data) => {
                serviceConfig = data
            })
        // clear test data before start testing
        deleteAllServices()
    })

    beforeEach(() => {
        cy.visit(workSpacesPage.workspacesUrl)
    })


    it("create service", () => {
        workSpacesPage.gotoCreateServicePage()
        workSpacesPage.createNewService(serviceConfig.create[0])

        cy.get(`[data-testid=${serviceConfig.create[0].name}]`, { timeout: 5000 })
            .should('exist')

    })

    it("create service with seperate endpoint element and advanced fields ", () => {
        workSpacesPage.gotoCreateServicePage()
        workSpacesPage.createNewService(serviceConfig.create[1])
        cy.wait(2000)

        cy.get(`[data-testid=${serviceConfig.create[1].name}]`)
            .should('exist')
        // expect()

    })


    after(() => {
        // Another way to clear the specified test data
        // if (createServiceId) {
        //     deleteServiceById(createServiceId)
        // }
        // if (createServiceAdvancedId) {
        //     deleteServiceById(createServiceAdvancedId)
        // }
    })

})