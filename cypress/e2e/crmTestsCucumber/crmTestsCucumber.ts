import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { loginPage } from "../../fixtures/pageObjects/loginPage.pageObjects";

Given("the user visits the login page", () => {
  loginPage.visit()
});

When("user fills out username and password and clicks login", () => {
  loginPage.loginUserNameInput().type('justin.cost@gmail.com')
  loginPage.loginPasswordInput().type('admin')
  loginPage.loginButton().click()
});

Then("user should see the contact list tab", () => {
  cy.url().should('include', '/myCRMApp/tabs/Contacts')
});
