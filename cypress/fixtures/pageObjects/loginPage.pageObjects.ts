export class loginPage {
    static visit(url: string = 'https://mycrmapp.azurewebsites.net/myCRMApp/') {
        cy.visit(url)
    }
    static loginUserNameInput = () => cy.get('input[name="email"]')
    static loginPasswordInput = () => cy.get('input[name="password"]')
    static loginButton = () => cy.get('ion-button').contains('Login')
    static addButton = () => cy.get('ion-fab-button')
    static logoutButton = () => cy.get('ion-button[name="logout"]')
    static contactListItem = () => cy.get('[name="contactListItem"]')

    static login() {
      loginPage.visit('https://mycrmapp.azurewebsites.net/myCRMApp/')
      loginPage.loginUserNameInput().type('justin.cost@gmail.com')
      loginPage.loginPasswordInput().type('admin')
      loginPage.loginButton().click()
    }
}