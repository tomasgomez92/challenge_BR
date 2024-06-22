import { type Locator, type Page } from "@playwright/test";

export class HomePage{
    readonly page: Page
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginButton = page.getByRole('link', { name: 'Iniciar sesión' });
    }

    async accessLogin(){
        await this.loginButton.click();
    }
}