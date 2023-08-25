declare namespace Cypress {
  interface Chainable<Subject> {
    loginFormCookie(url?: any, userObject?: any): Chainable<any>
    registerRequest(username?: string, password?: string): Chainable<any>
    loginRequest(username?: string, password?: string): Chainable<any>
    loginUI(username?: string, password?: string): Chainable<any>
  }
}
