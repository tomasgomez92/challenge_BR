import { type Locator, type Page } from "@playwright/test";

export class LoginPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMsg: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailInput = page.locator('#element-0');
        this.passwordInput = page.locator('#element-3');
        this.loginButton = page.locator('button[data-gtm-id="start-email-login"]');
        this.loginErrorMsg = page.getByText('Wrong email or password.');
        
    }

    async login(email: string, password: string): Promise<void>{
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}