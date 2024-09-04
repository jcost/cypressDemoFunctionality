/// <reference types="cypress" />
// ***********************************************

import 'cypress-localstorage-commands';

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
    //   const currentUser = JSON.parse(win.localStorage.getItem('currentUser') || '{}');
    //   const token = currentUser.token;
  
    //   if (!token) {
    //     throw new Error('No token found. Please ensure you have logged in first.');
    //   }
  
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
  
