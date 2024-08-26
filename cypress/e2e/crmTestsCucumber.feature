Feature: Login to CRM app

Scenario: User logs in with valid credentials
    Given the user visits the login page
    When user fills out username and password and clicks login
    Then user should see the contact list tab