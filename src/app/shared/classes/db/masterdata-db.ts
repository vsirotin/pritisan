import { IAlternative } from "../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons";
import { ITreeNode } from "../../../features/models/capture/capture-common-interfaces";
import { Logger } from "../../services/logging/logger";

export interface IMasterDataPersistence {
    readBeginningTypes(): Promise<IAlternative[]>;
    readEventTypes(): Promise<IAlternative[]>;
    readActivityTypes(): Promise<ITreeNode[]>;
    saveOrUpdateActivityTypes(activityTypes: ITreeNode[]): Promise<void>;
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

    async readActivityTypes(): Promise<ITreeNode[]> {
        this.logger.warn("MasterDataPersistence.readActivityTypes. Temporary implementation.");
        return [
            {
                name: 'Сон', id: 123,
                children: [
                    { name: 'Подготовка ко сну', id: 123 }, 
                    { name: 'Дремота', id: 123}, 
                    { name: 'Глубокий сон', id: 123},
                    { name: 'Проснулся среди на недолго', id: 123},
                    { name: 'Проснулся и долшл не мог заснуть', id: 233 },
                ],
            },
            {
                name: 'Отдых', id: 123,
                children: [
                    {
                        name: 'Спорт', id: 233,
                        children: [
                            { name: 'Пробежка', id: 233 }, 
                            { name: 'Велосипед', id: 233 },
                            { name: 'Плавание', id: 233 },
                            { name: 'Тренажерный зал', id: 233 },
                            { name: 'Физические упражнения дома', id: 233 },
                            { name: 'Прогулка', id: 233 },
                        ],
                    },
                    {
                        name: 'Занятие по дому', id: 123,
                        children: [
                            { name: 'Уборка', id: 233 }, 
                            { name: 'Работа в саду', id: 233},
                            { name: 'Приготовление пищи', id: 233 },
                            { name: 'Ремонт', id: 233 },
                            { name: 'Строительство', id: 233 },
                        ],
                    },
                ]
            },
            {
                name: 'Работа', id: 123,
                children: [
                    {
                        name: 'Путь на работу', id: 233,
                        children: [
                            { name: 'На поезде', id: 233 }, 
                            { name: 'На автомобиле', id: 233 },
                            { name: 'На автобусе', id: 233 },
                            { name: 'Пешком', id: 233 },
                        ],
                    },
                    {
                        name: 'Работа в офисе', id: 123,
                        children: [
                            { name: 'Совещание', id: 233 }, 
                            { name: 'Работа за компьютером', id: 233 }],
                    },
                ],
            },
        ];
    }

    async saveOrUpdateActivityTypes(activityTypes: ITreeNode[]): Promise<void> {
        console.log('activityTypes', activityTypes);
    }
}