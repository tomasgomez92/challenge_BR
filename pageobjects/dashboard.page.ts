import { Locator, Page } from "@playwright/test";


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
    }

    async addTask(taskName: string): Promise<void>{
        await this.addTaskButton.click();
        await this.taskInput.fill(taskName);

    }

    async selectDate(date: string){
        
    }

}