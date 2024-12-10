
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

export function deleteAllServices() {
    return getServicesList().then((lists) => {
        if (lists) {
            lists.forEach((item: any) => {
                console.log("item: ", item)
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
