import {test, expect, Page} from "@playwright/test";
import { HomePage } from "../pageobjects/home.page";
import { LoginPage } from "../pageobjects/login.page";
import { enums } from "../utils/enums";
import { DashboardPage } from "../pageobjects/dashboard.page";

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

        await test.step('Then I remove the task', async () => {
            await dashboardPage.deleteTask();
        });
        
    });
    
    test('I can modify something of the task created', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await test.step('I create a new task', async () => {
            await dashboardPage.addTask(taskNames.task2Test, dates.tomorrow, priorities.priority1);
            await dashboardPage.clickOnInbox();
        });

        await test.step('I click on the pencil to edit information of the task', async () => {
            await dashboardPage.clickWithRightOnTask();
            const edit = await page.getByText('Editar');
            await edit.click();
            await dashboardPage.editTask(dates.noDate, priorities.priority3);
        });

        await test.step('I validate that the changes are ok', async () => {
            await expect(dashboardPage.task2).toBeVisible();
        });
    });

    test('I can check all the tasks created', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await test.step('I create a new task', async () => {
            await dashboardPage.addTask(taskNames.task3Test, dates.tomorrow, priorities.priority1);
            await dashboardPage.clickOnInbox();
        });

        await test.step('I check a task', async () => {
            await dashboardPage.checkATask();
        });

        await test.step('I verify that I checked the task', async () => {
            await expect(dashboardPage.messageAtCheck).toBeVisible();
        });
        
    });
    
});
