/// <reference types="cypress" />
// ***********************************************

import 'cypress-localstorage-commands'

const jiraBaseUrl = 'https://justincost.atlassian.net'

Cypress.Commands.add('getSessionStorage', (key) => {
    cy.window().then((window) => window.sessionStorage.getItem(key))
  })
  
Cypress.Commands.add('setSessionStorage', (key, value) => {
    cy.window().then((window) => {
      window.sessionStorage.setItem(key, value)
    })
  })

/* This login method is needed to reduce speed and isolate other tests because we do not need to login through UI every time, 
   it's faster to do it through API and then visit the page so pick up the token.  The app that this method is authenticating with
   is an angular ionic app I created with c# backend.  The backend uses a JWT token (Bearer <token>) in the header of the request to
   authorize the api request.
*/
let token
Cypress.Commands.add('login', (admin: string) => {
    const users = Cypress.env('users')
    const user = users[admin]

    if(!user) {
        throw new Error('No user found with the name given')
    }
    
    cy.request({
      method: 'POST',
      url: 'https://crmservices.azurewebsites.net/api/Login/auth',
      body: { email: user.email, password: user.password },
    }).then((response) => {
      expect(response.status).to.eq(200);
  
      token = response.body.token;
      cy.window().then((win) => {
        win.localStorage.setItem('currentUser', JSON.stringify({ token }));
      });
  
      //This is done because you have to go to the website so that it can pick up the token before you navigate directly to a tabbed page.
      cy.visit('https://mycrmapp.azurewebsites.net')
    })
})

// cypress/support/commands.ts
Cypress.Commands.add('requestWithToken', (options: Partial<Cypress.RequestOptions>) => {
    // First, retrieve the token from localStorage (or any other storage mechanism)
    cy.window().then((win) => {
      if (!token) {
        throw new Error('No token found. Please ensure you have logged in first.');
      }
  
      // Merge the Authorization header into the provided options
      const authOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Make the request with the token
      return cy.request(authOptions);
    });
  });

Cypress.Commands.add('createJiraTicket', (summary: string, description: string): Cypress.Chainable => {
    const jiraEnvVariables = Cypress.env("jira")
    const jiraApiUrl = jiraEnvVariables["apiUrl"]
    const jiraEmail = jiraEnvVariables["email"]
    const jiraApiToken = jiraEnvVariables["apiToken"]
    const jiraProjectKey = jiraEnvVariables["projectKey"]
  
    //The params inside the object you are passing into this task call have to match what is defined in the actual task function in cypress.config.ts, otherwise it will be undefined.
    return cy.task('createJiraTicket', {
        jiraApiUrl,
        summary,
        description,
        jiraEmail,
        jiraApiToken,
        jiraProjectKey,
    }).then((response: { status: number; data: any }) => {
      cy.log('Response Status:', response.status);
      cy.log('Response Body:', JSON.stringify(response.data));
  
      if (response.status === 201) {
        cy.log('JIRA ticket created successfully:', response.data.key);
      } else {
        cy.log('Failed to create JIRA ticket:', response.data);
        throw new Error(`Failed to create JIRA ticket: ${JSON.stringify(response.data)}`);
      }
    })
  })
  
export function registerJiraTicketHook() {
    afterEach(function () {
        if (this.currentTest?.state === 'failed') {
            const { title, err } = this.currentTest

            cy.createJiraTicket(
                `Test failed: ${title}`,
                err?.message || 'No error message'
            )
        }
    })
}
  
