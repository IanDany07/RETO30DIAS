import { Locator, Page } from "@playwright/test";

export class LoginPage{
    // readonly: cuando se asigna al alemento sea una sola vez a travez del constructor(no pueden ser cambiados)
    readonly page: Page
    // aqui creamos los localizadores vacios
    readonly usernameInput:Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    // aqui se llama el objeto (usernameInput, passwordInput, ) a traves del constructor() le asignamos diferentes localizadores
    constructor(page:Page){
        this.page=page
        this.usernameInput = page.getByRole('textbox',{name:'username'})
        this.passwordInput = page.getByRole('textbox',{name:'password'})
        this.loginButton = page.getByRole('button',{name:'Login'})
    }
    //aqui creamos el metodo(doLogin) con las variables (username y password). Navegamos(url) y llenamos los campos(usernamey password) y hacemos clic
    async doLogin(usermame: string, Password: string){
    await this.page.goto('web/index.php/auth/login')
    await this.usernameInput.fill(usermame)
    await this.passwordInput.fill(Password)
    await this.loginButton.click()

    }

}