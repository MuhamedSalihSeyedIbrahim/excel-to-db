import { CosmosDB, Param } from '../lib/cosmosDB';

import * as config from '../config/dbConfig.json';

/**
 * Application model.
 */
class AppModel {
    private dbContext: CosmosDB;

    /**
     * Constructor
     */
    constructor() {
        this.dbContext = new CosmosDB(config, config.containerId);
    }

    /**
     * Save all record.
     */
    async saveAllRecords(record: Array<any>): Promise<Array<any>> {
        return this.dbContext.batchInsert(record);
    }
}

export { AppModel };
