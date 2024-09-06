import { mockResponses } from '../../fixtures/mocks/mockResponses'
import { loginPage } from '../../fixtures/pageObjects/loginPage.pageObjects'
import { ContactsEndpoints } from '../../fixtures/apiEndpoints/Contacts'

describe('ContactListTests', () => {
    it('Mock 30 entries in getAllContacts api endpoint', () => {
      loginPage.visit()
      loginPage.loginUserNameInput().type('justin.cost@gmail.com')
      loginPage.loginPasswordInput().type('admin')
      cy.intercept('GET', '/api/Contacts/getAllContacts**', mockResponses.mockContactList).as('getAllContacts')
      loginPage.loginButton().click()
      cy.wait('@getAllContacts')
      loginPage.contactListItem().should('have.length', 30)
    })
})
  