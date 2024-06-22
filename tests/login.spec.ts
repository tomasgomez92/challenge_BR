import {test, expect} from "@playwright/test";
import { HomePage } from "../pageobjects/home.page";
import { LoginPage } from "../pageobjects/login.page";
import { enums } from "../utils/enums";
import { DashboardPage } from "../pageobjects/dashboard.page";



test.describe('Validate tha can make the login correctly and the errors', () => {
    
    test('Login successfully', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step('Im in the todoist web page', async () => {
            await page.goto('');
        });

        await test.step('When I click on the button "Log in" Im redirected to the login page', async () => {
            await homePage.accessLogin();
            await expect(page).toHaveTitle('Log in to Todoist');
        });

        await test.step('I enter the correct email and password', async () => {
            await loginPage.login(enums.user.email, enums.user.password);
        });
        
        await test.step('I login successfully', async () => {
            await expect(dashboardPage.userInfoName).toHaveText(`${enums.user.name}`);
        });
        
    });

    test('Login unsuccessfully, enter an incorrect password', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
    
        await test.step('Im in the todoist web page', async () => {
            await page.goto('');
        });
    
        await test.step('When I click on the button "Log in" Im redirected to the login page', async () => {
            await homePage.accessLogin();
            await expect(page).toHaveTitle('Log in to Todoist');
        });
    
        await test.step('I enter the correct email and an incorrect password', async () => {
            await loginPage.login(enums.user.email, enums.user.incorrectpsw);
        });
        
        await test.step('I login successfully', async () => {
            await expect(loginPage.loginErrorMsg).toBeVisible();
        });
    
    });

    test('Login unsuccessfully, enter an incorrect email', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
    
        await test.step('Im in the todoist web page', async () => {
            await page.goto('');
        });
    
        await test.step('When I click on the button "Log in" Im redirected to the login page', async () => {
            await homePage.accessLogin();
            await expect(page).toHaveTitle('Log in to Todoist');
        });
    
        await test.step('I enter an incorrect email and a correct password', async () => {
            await loginPage.login(enums.user.incorrectEmail, enums.user.password);
        });
        
        await test.step('I login successfully', async () => {
            await expect(loginPage.loginErrorMsg).toBeVisible();
        });
    
    });
    
});
