import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { loginPage } from "../../../fixtures/pageObjects/loginPage.pageObjects";

Given("the user visits the login page", () => {
  loginPage.visit()
})

When('user fills out {string} and {string} and clicks login', (username: string, password: string) => {
  loginPage.loginUserNameInput().type(username)
  loginPage.loginPasswordInput().type(password)
  loginPage.loginButton().click()
})

Then('user should see the contact list tab', () => {
  cy.url().should('include', '/myCRMApp/tabs/Contacts')
})

Then('the user should see welcome {string} in run logs', (message: string) => {
  cy.log('message: ' + message )
})
