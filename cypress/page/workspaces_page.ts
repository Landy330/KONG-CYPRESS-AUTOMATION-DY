import BasePage from "./base_page";

type serviceConfigType = {
    name: string;
    tag: string;
    endpoint: { url: string } | {
        protocol: string,
        host: string
    };
    advanced?: advancedType
}
type advancedType = {
    retries: string;
    connectTimeout: string;
    writeTimeout: string;
    readTimeout: string
}


class WorkSpacePage extends BasePage {

    constructor() {
        super()
    }

    baseUrl: string = Cypress.env('baseUrl')
    overviewUrl = this.baseUrl + "/default/overview"
    workspacesUrl = this.baseUrl + "/workspaces"
    gatewayServicesUrl = this.baseUrl + "/default/services"

    // element of Service Lists Page
    newServiceBtn = '[data-testid="new-gateway-service"]'
    createServiceBtn = '[data-testid="toolbar-add-gateway-service"]' // empty or not

    // element of CreateService Detail Page 
    serviceNameInput = '[data-testid="gateway-service-name-input"]'
    typeTagsInput = '[data-testid="gateway-service-tags-input"]'
    endpointUrlInput = '[data-testid="gateway-service-url-input"]'
    trafficRadio = '[data-testid="gateway-service-protocol-radio"]'
    protocolSelect = '[data-testid="gateway-service-protocol-select"]'
    // protocolToHttpsOption = `[data-testid="select-item-${}"]`
    hostInput = '[data-testid="gateway-service-host-input"]'
    pathInput = '[data-testid="gateway-service-path-input"]'
    portInput = 'input[data-testid="gateway-service-port-input"]'
    advancedFieldCollapse = '[data-testid="collapse-trigger-label"]'
    retriesInput = 'input[data-testid="gateway-service-retries-input"]'
    connectTimeoutInput = '[data-testid="gateway-service-connTimeout-input"]'
    writeTimeoutInput = 'input[data-testid="gateway-service-writeTimeout-input"]'
    readTimeoutInput = 'input[data-testid="gateway-service-readTimeout-input"]'
    submitBtn = '[data-testid="service-form-submit"]'



    gotoCreateServicePage() {
        cy.visit(this.gatewayServicesUrl)
    }

    createNewService(serviceConfig: serviceConfigType) {
        console.log("serviceConfig: ", serviceConfig)
        // create new gateway service
        debugger;
        cy.get(this.createServiceBtn, { timeout: 5000 }).then((ele) => {
            if (ele.length > 0 && ele.is('visible')) {
                cy.wrap(ele).click()
            } else {
                cy.get(this.newServiceBtn, { timeout: 5000 })
                    .click()
            }
        })

        // New Gateway Service title
        debugger;
        cy.get(this.serviceNameInput)
            .type(serviceConfig.name)

        // type tags
        debugger;
        cy.get(this.typeTagsInput)
            .should('exist')
            .type(serviceConfig.tag)

        if ("url" in serviceConfig.endpoint) {
            debugger;
            cy.get(this.endpointUrlInput)
                .should('exist')
                .type(serviceConfig.endpoint.url)
        } else {
            // using separate element to define endpoint
            this.setEndpointWithSeparate(serviceConfig.endpoint.protocol, serviceConfig.endpoint.host)
        }

        if ("advanced" in serviceConfig) {
            // set advanced fields
            this.modifyAdvancedField(serviceConfig.advanced)
        }

        // save config
        debugger;
        cy.get(this.submitBtn).click()
    }

    modifyAdvancedField(advanced: advancedType | undefined) {
        if (advanced === undefined) {
            return
        }
        // uncollapse view advanced field
        cy.get(this.advancedFieldCollapse).click()
        cy.get(this.retriesInput)
            .invoke('val', '')
            .type(advanced.retries)
        cy.get(this.connectTimeoutInput)
            .invoke('val', '')
            .type(advanced.connectTimeout)
        cy.get(this.writeTimeoutInput)
            .invoke('val', '')
            .type(advanced.writeTimeout)
        cy.get(this.readTimeoutInput)
            .invoke('val', '')
            .type(advanced.readTimeout)
    }

    setEndpointWithSeparate(protocol: string, host: string, path?: string, port?: string) {
        // click radio to protocols
        cy.get(this.trafficRadio)
            .click()

        // select protocol as https
        cy.get(this.protocolSelect)
            .click()
        cy.get(`[data-testid="select-item-${protocol}"]`)

        // type host 
        cy.get(this.hostInput)
            .type(host)

        // type path
        if (path) {
            cy.get(this.pathInput)
                .type(path)
        }

        // type port
        if (port) {
            cy.get(this.portInput)
                .invoke('val', '')
                .type(port)
        }

    }


    deleteServiceFromList(serviceConfig: serviceConfigType) {

    }

    // it("UI check", () => {
    //     cy.get('.title', {timeout: 2000})
    //     .should("have.text", "New Gateway Service")

    //     cy.get('.support-text > p')
    //     .should("not.be.empty")

    //     cy.get('.form-section-title').first()
    //     .should("have.text", "General Information")

    //     cy.get('.form-section-title').first().get('.form-section-wrapper > .form-section-info > .form-section-description > p')
    //     .should("not.be.empty")

    //     cy.get('.form-section-title').eq(1)
    //     .should("have.text", "Service Endpoint")

    //     cy.get('[data-testid="service-form-cancel"]')
    //     .should("have.text", "Cancel")

    //     cy.get('[data-testid="service-form-submit"]')
    //     .should("be.disabled")
    // })


}

export default WorkSpacePage;