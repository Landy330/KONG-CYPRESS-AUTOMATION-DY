
const defaultServicesUrl = `http://localhost:8001/default/services?sort_desc=1&size=30`

export function getServicesList() {
    return cy.request(defaultServicesUrl)
    .then((response) => {
        if (response.status === 200) {
            return response.body.data;
        } else {
            throw new Error(`Request failed with status code ${response.status}`);
        }
    })
}

export const createServiceDefault = (serviceName: string, url: string) => {
    const payload = {
        "name": serviceName,
        "tags": null,
        "read_timeout": 60000,
        "retries": 5,
        "connect_timeout": 60000,
        "ca_certificates": null,
        "client_certificate": null,
        "write_timeout": 60000,
        "port": 443,
        "url": url
    }
    return cy.request({
        method: 'POST',
        url: 'http://localhost:8001/default/services',
        body: payload,
        headers: {
            'Content-Type': 'application/json',
          },
    }).then((response) => {
        if (response.status === 201) {
            return response.body;
        } else {
            throw new Error(`Request failed with status code ${response.status}`);
        }
    })
}

export function deleteAllServices() {
    return getServicesList().then((lists) => {
        if (lists) {
            lists.forEach((item: any) => {
                deleteServiceById(item.id)
            })
        }
    })    

}

export function deleteServiceById(id: string) {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:8001/default/services/${id}`
    }).then((response) => {
        console.log("response: ", response)
    })
}

