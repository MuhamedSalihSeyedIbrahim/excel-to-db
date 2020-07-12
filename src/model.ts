import { CosmosDB, Param } from '../lib/cosmosDB';

import * as config from '../config/dbConfig.json';

class AppModel {
    private dbContext: CosmosDB;

    constructor() {
        this.dbContext = new CosmosDB(config, config.containerId);
    }

    async saveAllRecords(record: Array<any>): Promise<Array<any>> {
        return this.dbContext.batchInsert(record);
    }
}

export { AppModel };
