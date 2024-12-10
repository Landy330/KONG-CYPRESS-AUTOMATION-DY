
const routeBaseUrl = Cypress.env('baseUrl') + "/default/routes"

export function getRoutesList() {
    return cy.request(`${routeBaseUrl}?sort_desc=1&size=30`)
    .then((response) => {
        if (response.status === 200) {
            return response.body.data;
        } else {
            throw new Error(`Request failed with status code ${response.status}`);
        }
    })
}

export function deleteRouteById(id: string) {
    cy.request({
        method: 'DELETE',
        url: `${routeBaseUrl}/${id}`
    }).then((response) => {
        console.log("response: ", response)
    })
}