import { mockResponses } from "../fixtures/mocks/mockResponses"
import { loginPage } from "../fixtures/pageObjects/loginPage.pageObjects"

describe('ContactListTests', () => {
    it('Login and verify url on default contact list page.', () => {
      loginPage.login()
      cy.url().should('include', '/myCRMApp/tabs/Contacts')
      loginPage.logoutButton().click()
    })
    it('Mock 100 entries in getAllContacts api endpoint', () => {
      loginPage.visit()
      loginPage.loginUserNameInput().type('justin.cost@gmail.com')
      loginPage.loginPasswordInput().type('admin')
      cy.intercept('GET', '/api/Contacts/getAllContacts**', mockResponses.mockContactList).as('getAllContacts')
      loginPage.loginButton().click()
      cy.wait('@getAllContacts')
      loginPage.contactListItem().should('have.length', 30)
    })
    it.skip('Add Contact', () => {

    })
    it.skip('Add Action to Contact', () => {

    })
})
  