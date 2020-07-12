import * as fs from 'fs';
import * as path from 'path';

import { CosmosDB, Param } from '../lib/cosmosDB';
import { error, info } from '../lib/logger';

import * as paths from '../config/scriptConfig.json';
import * as config from '../config/dbConfig.json';

function dirSetUp(path) {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    info(`Dir crreated: ${path}`);
}

async function setUpPrj() {
    Object.keys(paths).forEach((sourcePath) => {
        sourcePath.indexOf('Dir') !== -1 ? dirSetUp(paths[sourcePath]) : dirSetUp(path.dirname(paths[sourcePath]));
    });

    const dbContext = new CosmosDB(config, config.containerId);

    await dbContext.createDatabase(config);
    await dbContext.createContainer(config);
    info(`DB Created: ${config.databaseId}`);
}

setUpPrj().catch((err) => error(err.message));
