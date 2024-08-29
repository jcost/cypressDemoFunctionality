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
    static addContactFullNameInput = () => cy.get('input[name="fullName"]')
    static addContactPhoneNumberInput = () => cy.get('input[name="phoneNumbrer"]')
    static addContactEmailInput = () => cy.get('input[name="email"]').eq(1)
    //static addContactEmailInput = () => cy.get('ion-input[name="email"]').find('input[name="email"]')
    static addContactBackgrouondInput = () => cy.get('input[name="background"]')
    static saveButton = () => cy.get('ion-button[name="save"]')
    static deleteContactButton = () => cy.contains('ion-item', 'Justin Cas').find('ion-icon[name="trash"]')
    static login() {
      loginPage.visit('https://mycrmapp.azurewebsites.net/myCRMApp/')
      loginPage.loginUserNameInput().type('justin.cost@gmail.com')
      loginPage.loginPasswordInput().type('admin')
      loginPage.loginButton().click()
    }
}