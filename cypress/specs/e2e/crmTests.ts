import { mockResponses } from '../../fixtures/mocks/mockResponses'
import { loginPage } from '../../fixtures/pageObjects/loginPage.pageObjects'
import { ContactsEndpoints } from '../../fixtures/apiEndpoints/Contacts'

describe('ContactListTests', () => {
    it('Login and verify url on default contact list page.', () => {
      cy.login('admin')
      loginPage.visit()
      cy.url().should('include', '/myCRMApp/tabs/Contacts')
    })
    it('Add Contact', () => {
      cy.intercept('GET', '/api/Contacts/getAllContacts**').as('getAllContacts')
      loginPage.login()
      cy.wait('@getAllContacts')
      loginPage.addButton().click()
      loginPage.addContactFullNameInput().type('Justin Case')
      loginPage.addContactPhoneNumberInput().type('9912323434')
      loginPage.addContactEmailInput().type('j@j.com')
      loginPage.addContactBackgrouondInput().type('Testing background')
      loginPage.saveButton().click()

      //Make sure new item with specific name is checked on contact list.
      //Validate contact details by clicking on the contact in contact list.
      loginPage
    })
    it.skip('Add Action to Contact', () => {
      loginPage.login()
    })
})
  