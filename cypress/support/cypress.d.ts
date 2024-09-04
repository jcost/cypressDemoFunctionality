declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in to the application using JWT authentication.
       * @example cy.login('user@example.com', 'password123')
       */
      login(username): Chainable<void>
      getSessionStorage(key)
      setSessionStorage(key, value)
      requestWithToken(options: Partial<Cypress.RequestOptions>)
    }
  }
  