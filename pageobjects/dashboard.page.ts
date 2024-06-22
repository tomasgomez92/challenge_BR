import { Locator, Page } from "@playwright/test";
import { enums } from "../utils/enums";

const {
    dates,
    priorities
} = enums


export class DashboardPage{
    readonly page: Page;
    readonly userInfoName: Locator;
    readonly dashboardTitle: Locator;
    readonly addTaskButton: Locator;
    readonly taskInput: Locator;
    readonly dateButton: Locator;
    readonly priorityButton: Locator;
    readonly moreActionsButton: Locator;
    readonly cancelButton: Locator;
    readonly finishTaskButton: Locator;
    readonly selectDateButton: Locator;
    readonly tomorrowButton: Locator;
    readonly nextWeekendButton: Locator;
    readonly nextWeekButton: Locator;
    readonly notDateButton: Locator;
    readonly priority1Button: Locator;
    readonly priority2Button: Locator;
    readonly priority3Button: Locator;
    readonly priority4Button: Locator;
    readonly inboxButton: Locator;
    readonly task1: Locator;
    readonly task2: Locator;
    readonly saveButton: Locator;
    readonly taskEdited: Locator;
    readonly checkTask: Locator;
    readonly messageAtCheck: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.userInfoName = page.getByLabel('Configuración');
        this.dashboardTitle = page.getByRole('heading', { name: 'Hoy' });
        this.addTaskButton = page.getByTestId('app-sidebar-container').getByRole('button', { name: 'Añadir tarea' });
        this.taskInput = page.getByLabel('Nombre de la tarea').getByRole('paragraph');
        this.dateButton = page.getByLabel('Establecer fecha de');
        this.priorityButton = page.getByLabel('Establecer prioridad');
        this.moreActionsButton = page.getByTestId('modal-overlay').getByLabel('Más acciones');
        this.cancelButton = page.getByLabel('Cancelar');
        this.finishTaskButton = page.getByTestId('task-editor-submit-button');
        this.selectDateButton = page.getByLabel('Establecer fecha de');
        this.tomorrowButton = page.getByRole('button', { name: 'Mañana'});
        this.nextWeekendButton = page.getByRole('button', { name: 'Próximo fin de semana' });
        this.nextWeekButton = page.getByRole('button', { name: 'Próxima semana' });
        this.notDateButton = page.getByRole('button', { name: 'Sin fecha' });
        this.priority1Button = page.getByLabel('Prioridad 1');
        this.priority2Button = page.getByLabel('Prioridad 2');
        this.priority3Button = page.getByLabel('Prioridad 3');
        this.priority4Button = page.getByLabel('Prioridad 4');
        this.inboxButton = page.getByText('Bandeja de entrada').last();
        this.task1 = page.getByLabel('Task 1 Test');
        this.task2 = page.getByLabel('Task 2 Test');
        this.saveButton = page.getByTestId('task-editor-submit-button');
        this.taskEdited = page.getByLabel('Task Name Edited');
        this.checkTask = page.getByLabel('Marca la tarea como completada');
        this.messageAtCheck = page.getByText('tarea completadaDeshacer');
    }

    async addTask(taskName: string, date: string, priority: string): Promise<void>{
        await this.addTaskButton.click();
        await this.taskInput.fill(taskName);
        await this.selectDate(date);
        await this.selectPriority(priority);
        await this.finishTaskButton.click();
    }

    async selectDate(date: string): Promise<void>{
        await this.dateButton.click();
        let selected;
        switch(date){
            case dates.tomorrow:
                selected = this.tomorrowButton;
                break;
            case dates.nextWeekend:
                selected = this.nextWeekendButton;
                break;
            case dates.nextWeek:
                selected = this.nextWeekButton;
                break;
            case dates.noDate:
                selected = this.notDateButton;
                break;
            default:
                throw new Error(`The date selected is not a valid one`);
        }
        await selected.click();
    }

    async selectPriority(priority: string): Promise<void>{
        await this.priorityButton.click();
        let selected;
        switch(priority){
            case priorities.priority1:
                selected = this.priority1Button;
                break;
            case priorities.priority2:
                selected = this.priority2Button;
                break;
            case priorities.priority3:
                selected = this.priority3Button;
                break;
            case priorities.priority4:
                selected = this.priority4Button;
                break;
            default:
                throw new Error(`The priority selected is not a valid one`);
        }
        await selected.click();
    }

    async clickOnInbox(): Promise<void>{
        await this.inboxButton.click();
    }

    async clickWithRightOnTask(): Promise<void>{
        await this.task1.click({ button: 'right' });
    }

    async editTask(taskName: string, date: string, priority: string): Promise<void>{
        await this.taskInput.fill(taskName);
        await this.selectDate(date);
        await this.selectPriority(priority);
        await this.saveButton.click();
    }

    async checkATask(): Promise<void>{
        await this.checkTask.click();
    }
}