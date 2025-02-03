import { IAlternative, IAlternativeList } from "../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons";
import { ITreeNode } from "../../../features/models/capture/capture-common-interfaces";
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

export interface IMasterDataPersistence {
    readBeginningTypes(): Promise<IAlternativeList>;
    readEventTypes(): Promise<IAlternativeList>;
    readActivityTypes(): Promise<ITreeNode[]>;
    saveOrUpdateActivityTypes(activityTypes: ITreeNode[]): Promise<void>;
}

export class MasterDataPersistence implements IMasterDataPersistence {

    private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.MasterDataPersistence");

    constructor() {}

    
    async readEventTypes(): Promise<IAlternativeList> {
        this.logger.warn("MasterDataPersistence.readEventTypes. Temporary implementation.");
        return {
            currentAlternativeId: 0,
            titleForAlternativeSelection: 'Событие:',

            alternatives: [
                {id:  1, name: 'Событие, деятельность (началось, закончилось...)'}, 
                {id: 2, name: 'Деньги, ресурсы использованы...'}, 
                {id: 3, name: 'Наблюдение сделано...'}, 
            ],
        };
    }

    async readBeginningTypes(): Promise<IAlternativeList> {
        this.logger.warn("MasterDataPersistence.readBeginningTypes. Temporary implementation.");
        return {
            currentAlternativeId: 0,
            titleForAlternativeSelection: 'Выберите начало события',
            alternatives:[
                {id:  1, name: 'с началом в(время)'}, 
                {id: 2, name: 'начато назад (минут, часов, дней...)'}, 
            ],
        };
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