import { mockResponses } from "../fixtures/mocks/mockResponses"
import { loginPage } from "../fixtures/pageObjects/loginPage.pageObjects"

describe('ContactListTests', () => {
    it('Login and verify url on default contact list page.', () => {
      cy.login('admin')
      loginPage.visit()
      cy.url().should('include', '/myCRMApp/tabs/Contacts')
    })
    it.only('Login via API and hit the getAllContacts API endpoint', () =>{
      cy.login('admin')
      cy.requestWithToken({url: 'https://crmservices.azurewebsites.net/api/Contacts/getAllContacts?status=Contacts&sortBy=fullName&order=ASC'}).then((response) => {
        cy.log(JSON.stringify(response.body))
      })
    })
    it('Mock 30 entries in getAllContacts api endpoint', () => {
      loginPage.visit()
      loginPage.loginUserNameInput().type('justin.cost@gmail.com')
      loginPage.loginPasswordInput().type('admin')
      cy.intercept('GET', '/api/Contacts/getAllContacts**', mockResponses.mockContactList).as('getAllContacts')
      loginPage.loginButton().click()
      cy.wait('@getAllContacts')
      loginPage.contactListItem().should('have.length', 30)
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
  