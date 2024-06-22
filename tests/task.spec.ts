import {test, expect, Page} from "@playwright/test";
import { HomePage } from "../pageobjects/home.page";
import { LoginPage } from "../pageobjects/login.page";
import { enums } from "../utils/enums";
import { DashboardPage } from "../pageobjects/dashboard.page";

let page: Page;

const {
    user,
    taskNames,
    dates,
    priorities
} = enums

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await page.goto('');
    await homePage.accessLogin();
    await loginPage.login(user.email, user.password);
});

// test.afterEach(async ({ page }) => {
//     await page.close();
// })


test.describe('In this section we are going to validate different "tasks" functionalities', () => {

    test('Create a new task', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await test.step('Im in the dashboard page and click on the button to add a new task and I select the required fields', async () => {
            await dashboardPage.addTask(taskNames.task1Test, dates.tomorrow, priorities.priority1);
            await dashboardPage.clickOnInbox();
        });
        
        await test.step('I validate that the task is in my dashboard', async () => {
            await expect(dashboardPage.task1).toBeVisible();
        });
        
    });
    
    test('Create more than one task', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await test.step('Im in the dashboard page and I create more than 1 task', async () => {
            await dashboardPage.addTask(taskNames.task1Test, dates.tomorrow, priorities.priority1);
            await dashboardPage.addTask(taskNames.task2Test, dates.nextWeekend, priorities.priority2);
            await dashboardPage.clickOnInbox();
        });

        await test.step('I validate that the tasks are created correctly', async () => {
            await expect(dashboardPage.task1).toBeVisible();
            await expect(dashboardPage.task2).toBeVisible();
        });
        
        
    })
    
    
});
