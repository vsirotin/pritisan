import { IActivityTypeNode } from "../../../features/models/capture/capture-common-interfaces";
import { Logger } from "../../services/logging/logger";

export interface IMasterDataPersistence {
    readEventTypes(): Promise<string[]>;
    readActivityTypes(): Promise<IActivityTypeNode[]>;
    saveOrUpdateActivityTypes(activityTypes: IActivityTypeNode[]): Promise<void>;
}

export class MasterDataPersistence implements IMasterDataPersistence {

    constructor(private logger: Logger) {}

    
    async readEventTypes(): Promise<string[]> {
        this.logger.warn("CurrentEventBusinessLogicModel.getEventTypes. Temporary implementation.");
        return ['Beginning of ', 'Ending of ', 'Occurred in the past', 'Spent'];
    }

    async readActivityTypes(): Promise<IActivityTypeNode[]> {
        this.logger.warn("CurrentEventBusinessLogicModel.readActivityTypes. Temporary implementation.");
        return [
            {
                name: 'Fruit',
                children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
            },
            {
                name: 'Vegetables',
                children: [
                    {
                        name: 'Green',
                        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
                    },
                    {
                        name: 'Orange',
                        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
                    },
                ],
            },
        ];
    }

    async saveOrUpdateActivityTypes(activityTypes: IActivityTypeNode[]): Promise<void> {
        console.log('activityTypes', activityTypes);
    }
}