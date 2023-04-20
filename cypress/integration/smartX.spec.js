

const expectedPlaces =  require('../fixtures/expectedPlaces.json')

describe.only('api testing', () => {
    it('GET - api.zippopotam.us/country/postal-code', () => {
        cy.request({
            method: 'GET',
            url:  "/us/90210",
            failOnStatusCode : true,
        }).as('resp')
        cy.get('@resp').then(response => {
            let expStatus = 200
            cy.checkResponseStatus(response.status, expStatus)
            cy.printResponseBody(response.body)
            cy.task("log", response.body.country)
            expect(response.body.places[0]['state']).to.equal('California')
            expect(response.body).to.deep.equal(expectedPlaces)
        })

    })

    it('GET - api.zippopotam.us/country/state/city ', () => {
        cy.request({
            method: 'GET',
            url:  "/us/ma/belmont",
            failOnStatusCode : true,
        }).as('response')

        cy.get('@response').then(response => {
            let expStatus = 200
            cy.checkResponseStatus(response.status, expStatus)
            cy.printResponseBody(response.body)
            expect(response.body.places[0]['place name']).to.equal('Belmont')
        })
    })

    it('GET - negative test - api.zippopotam.us/invalid-country/state/city ', () => {
        cy.request({
            method: 'GET',
            url:  "/invalid/ma/belmont",
            failOnStatusCode : false,
        }).as('response')

        cy.get('@response').then(response => {
            let expStatus = 404
            cy.checkResponseStatus(response.status, expStatus)
            cy.printResponseBody(response.body)
        })
    })

   
})


//3.Write up a couple of examples of how you would include DB validation if you had access to the DB (it can be in the form of bullet points).
        // . I can use data constraints at the database level. I can add constraints to a table's columns, such as "not null," "unique," "foreign key," "check," etc. 
        // . I can use a stored procedure is a pre-compiled set of SQL statements that can be executed repeatedly
        // . I can use triggers database objects to validate data 
        // . I can also do regular data cleaning to maintain the integrity of the data stored in the database. 
