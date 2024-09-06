Feature: Login to CRM app

Scenario: User logs in with valid credentials
    Given the user visits the login page
    When user fills out "<username>" and "<password>" and clicks login
    Then user should see the contact list tab
    And the user should see welcome "<message>" in run logs

#Scenario Outline: This is used for the data flowing into the test and looping through it.  Typically the data would be different.
 Examples:
    | username                  | password  | message           |
    | justin.cost@gmail.com     | admin     | Log message 1     |
    | justin.cost@gmail.com     | admin     | Log message 2     |
    | justin.cost@gmail.com     | admin     | Log message 3     |
