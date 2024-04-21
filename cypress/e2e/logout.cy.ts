describe('Login then logout', () => {

  it('login first then clears localStorage user object and redirect to login', function () {
    cy.login(Cypress.env('test_email'), Cypress.env('test_password'))

    cy.visit('/pollution')

    context('wait', () => {
      cy.wait(3000)

      cy.get('#button_logout').click()

      cy.url().should('include', '/login')

      cy.getAllLocalStorage().then((result) => {
        if (result.hasOwnProperty(Cypress.config('baseUrl'))) {
          expect(result[Cypress.config('baseUrl')]).not.to.have.property('user')
        }
      })

      cy.get('#button_logout').should('not.exist')
    })
  })
})
