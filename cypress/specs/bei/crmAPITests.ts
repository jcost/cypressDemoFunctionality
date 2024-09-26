import { mockResponses } from '../../fixtures/mocks/mockResponses'
import { loginPage } from '../../fixtures/pageObjects/loginPage.pageObjects'
import { ContactsEndpoints } from '../../fixtures/apiEndpoints/Contacts'

describe('ContactListAPITests', () => {
    it('Login via API and hit the getAllContacts API endpoint and validate field values and types', () =>{
      const idRegex = /^[A-Za-z0-9]{20}$/
      const phoneRegex = /^\d{10}$/
      const dueDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}Z$/

      cy.login('admin')
      cy.requestWithToken({url: ContactsEndpoints.getAllContactsPath}).then((response) => {
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
})
  