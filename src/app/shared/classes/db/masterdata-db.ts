import { IAlternative } from "../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons";
import { IEventTypeNode } from "../../../features/models/capture/capture-common-interfaces";
import { Logger } from "../../services/logging/logger";

export interface IMasterDataPersistence {
    readBeginningTypes(): Promise<IAlternative[]>;
    readEventTypes(): Promise<IAlternative[]>;
    readActivityTypes(): Promise<IEventTypeNode[]>;
    saveOrUpdateActivityTypes(activityTypes: IEventTypeNode[]): Promise<void>;
}

export class MasterDataPersistence implements IMasterDataPersistence {

    constructor(private logger: Logger) {}

    
    async readEventTypes(): Promise<IAlternative[]> {
        this.logger.warn("MasterDataPersistence.readEventTypes. Temporary implementation.");
        return [
            {signalId:  "start-of-event", localizedName: 'Начало', alternativeId: '1', suffix: '(события, деятедьности...)'}, 
            {signalId: "finish-of-event", localizedName: 'Окончание', alternativeId: '2', suffix: '(события, деятедьности...)'}, 
            {signalId: "occured-in", localizedName: 'Произошло в прошлом', alternativeId: '3', suffix: '(событие, деятельность...)'}, 
            {signalId: "spent", localizedName: 'Израсходовано', alternativeId: '4', suffix: '(денег, материалов...)'}, 
        ];
    }

    async readBeginningTypes(): Promise<IAlternative[]> {
        this.logger.warn("MasterDataPersistence.readBeginningTypes. Temporary implementation.");
        return [
            {signalId:  "with-time", localizedName: 'с началом в', alternativeId: '1', suffix: '(время)'}, 
            {signalId: "days-ago", localizedName: 'начато назад', alternativeId: '2', suffix: '(минут, часов, дней...)'}, 
        ];
    }

    async readActivityTypes(): Promise<IEventTypeNode[]> {
        this.logger.warn("MasterDataPersistence.readActivityTypes. Temporary implementation.");
        return [
            {
                name: 'Сон',
                children: [
                    { name: 'Подготовка ко сну', id: 123 }, 
                    { name: 'Дремота' }, 
                    { name: 'Глубокий сон' },
                    { name: 'Проснулся среди на недолго' },
                    { name: 'Проснулся и долшл не мог заснуть', id: 233 },
                ],
            },
            {
                name: 'Отдых',
                children: [
                    {
                        name: 'Спорт',
                        children: [
                            { name: 'Пробежка' }, 
                            { name: 'Велосипед' },
                            { name: 'Плавание' },
                            { name: 'Тренажерный зал' },
                            { name: 'Физические упражнения дома' },
                            { name: 'Прогулка' },
                        ],
                    },
                    {
                        name: 'Занятие по дому',
                        children: [
                            { name: 'Уборка' }, 
                            { name: 'Работа в саду'},
                            { name: 'Приготовление пищи' },
                            { name: 'Ремонт' },
                            { name: 'Строительство' },
                        ],
                    },
                ]
            },
            {
                name: 'Работа',
                children: [
                    {
                        name: 'Путь на работу',
                        children: [
                            { name: 'На поезде' }, 
                            { name: 'На автомобиле' },
                            { name: 'На автобусе' },
                            { name: 'Пешком' },
                        ],
                    },
                    {
                        name: 'Работа в офисе',
                        children: [
                            { name: 'Совещание' }, 
                            { name: 'Работа за компьютером' }],
                    },
                ],
            },
        ];
    }

    async saveOrUpdateActivityTypes(activityTypes: IEventTypeNode[]): Promise<void> {
        console.log('activityTypes', activityTypes);
    }
}