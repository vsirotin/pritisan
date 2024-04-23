import { IEventType } from "../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons";
import { IEventTypeNode } from "../../../features/models/capture/capture-common-interfaces";
import { Logger } from "../../services/logging/logger";

export interface IMasterDataPersistence {
    readEventTypes(): Promise<IEventType[]>;
    readActivityTypes(): Promise<IEventTypeNode[]>;
    saveOrUpdateActivityTypes(activityTypes: IEventTypeNode[]): Promise<void>;
}

export class MasterDataPersistence implements IMasterDataPersistence {

    constructor(private logger: Logger) {}

    
    async readEventTypes(): Promise<IEventType[]> {
        this.logger.warn("CurrentEventBusinessLogicModel.getEventTypes. Temporary implementation.");
        return [
            {id:  "start-of-event", localizedName: 'Начало'}, 
            {id: "finish-of-event", localizedName: 'Окончание'}, 
            {id: "occured-in", localizedName: 'Израсходовано'}, ];
    }

    async readActivityTypes(): Promise<IEventTypeNode[]> {
        this.logger.warn("CurrentEventBusinessLogicModel.readActivityTypes. Temporary implementation.");
        return [
            {
                name: 'Сон',
                children: [
                    { name: 'Подготовка ко сну' }, 
                    { name: 'Дремота' }, 
                    { name: 'Глубокий сон' },
                    { name: 'Проснулся среди на недолго' },
                    { name: 'Проснулся и долшл не мог заснуть' },
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