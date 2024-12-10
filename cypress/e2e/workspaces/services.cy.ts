import WorkSpacePage from "../../page/workspaces_page"
import { deleteAllServices } from "../../utils/service_apis";

const workSpacesPage = new WorkSpacePage()
let serviceConfig: any;

describe("Gateway Services Page", () => {
    before(() => {
        cy.fixture('service_config.json')
            .then((data) => {
                serviceConfig = data
            })
        deleteAllServices()
    })

    beforeEach(() => {
        cy.visit(workSpacesPage.workspacesUrl)
    })

    it("test", () => {
        workSpacesPage.gotoCreateServicePage()
        console.log("hhh")
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
        // console.log("createServiceId: ", createServiceId)
        // console.log("createServiceAdvancedId: ", createServiceAdvancedId)

        // if (createServiceId) {
        //     cy.request({
        //         method: 'DELETE',
        //         url: `http://localhost:8001/default/services/${createServiceId}`
        //       }).then((response) => {
        //         console.log("response: ", response)
        //       })
        // }
        // if (createServiceAdvancedId) {
        //     cy.request({
        //         method: 'DELETE',
        //         url: `http://localhost:8001/default/services/${createServiceAdvancedId}`
        //       }).then((response) => {
        //         console.log("response: ", response)
        //       })
        // }
    })

    // afterEach(()=>{})
})