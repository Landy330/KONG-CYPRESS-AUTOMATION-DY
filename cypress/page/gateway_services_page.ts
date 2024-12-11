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


class GatewayServicesPage extends BasePage {

    constructor() {
        super()
    }

    baseRoute: string = "http://localhost:8002"
    overviewUrl = this.baseRoute + "/default/overview"
    workspacesUrl = this.baseRoute + "/workspaces"
    gatewayServicesUrl = this.baseRoute + "/default/services"

    // element of Service Lists Page
    newServiceBtn = '[data-testid="new-gateway-service"], [data-testid="toolbar-add-gateway-service"]' // create button when service is empty or not
    
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
        console.log("baseRoute: ", this.baseRoute)
        cy.visit(this.gatewayServicesUrl)
    }

    createNewService(serviceConfig: serviceConfigType) {
        // create new gateway service
        cy.get(this.newServiceBtn, {timeout: 5000})
        .filter(':visible')
        .click()

        // New Gateway Service title
        cy.get(this.serviceNameInput)
            .type(serviceConfig.name)

        // type tags
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

}

export default GatewayServicesPage;