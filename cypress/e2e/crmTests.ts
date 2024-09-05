import { mockResponses } from '../fixtures/mocks/mockResponses'
import { loginPage } from '../fixtures/pageObjects/loginPage.pageObjects'
import { ContactsEndpoints } from '../fixtures/apiEndpoints/Contacts'

describe('ContactListTests', () => {
    it('Login and verify url on default contact list page.', () => {
      cy.login('admin')
      loginPage.visit()
      cy.url().should('include', '/myCRMApp/tabs/Contacts')
    })
    it('Login via API and hit the getAllContacts API endpoint and validate field values and types', () =>{
      const idRegex = /^[A-Za-z0-9]{20}$/
      const phoneRegex = /^\d{10}$/
      const dueDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/

      cy.login('admin')
      cy.requestWithToken({url: ContactsEndpoints.getAllContactsPath}).then((response) => {
        //cy.log(JSON.stringify(response.body))
        expect(response.body.message).to.equal('200')

        response.body.contacts.forEach((contact) => {

        expect(contact.id).to.match(idRegex)
        cy.wrap(contact.id).should('match', idRegex);
        expect(typeof contact.id).to.equal('string')
        cy.wrap(contact.id).should('be.a', 'string')
        
        expect(contact.status).to.equal('Contacts')
        expect(typeof contact.status).to.equal('string')
        cy.wrap(contact.status).should('be.a', 'string')
        
        expect(contact.fullName).to.equal('Justin Case')
        expect(typeof contact.fullName).to.equal('string')
        cy.wrap(contact.fullName).should('be.a', 'string')
        
        expect(contact.phoneNumber).to.match(phoneRegex)
        cy.wrap(contact.phoneNumber).should('match', phoneRegex);
        expect(typeof contact.phoneNumber).to.equal('string')
        cy.wrap(contact.phoneNumber).should('be.a', 'string')
        
        expect(typeof contact.email).to.equal('string')
        cy.wrap(contact.email).should('be.a', 'string')
        
        expect(typeof contact.background).to.equal('string')
        cy.wrap(contact.background).should('be.a', 'string')
        
        expect(typeof contact.score).to.equal('number')
        cy.wrap(contact.score).should('be.a', 'number')
        
        if(contact.actions.length > 0) {
          contact.actions.forEach((action) => {
            expect(typeof action.completed).to.equal('boolean')
            cy.wrap(action.completed).should('be.a', 'boolean')
            
            expect(action.dueDate).to.match(dueDateRegex)
            cy.wrap(action.dueDate).should('match', dueDateRegex);
            expect(typeof action.dueDate).to.equal('string')
            cy.wrap(action.dueDate).should('be.a', 'string')
            
            expect(typeof action.actionDescription).to.equal('string')
            cy.wrap(action.actionDescription).should('be.a', 'string')
            
            expect(action.actionType).to.be.null
            cy.wrap(action.actionType).should('equal', null)
            
            expect(action.formattedDueDate).to.be.null
            cy.wrap(action.formattedDueDate).should('equal', null)
          })
        }
        
      })
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
  