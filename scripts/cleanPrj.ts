import * as fs from 'fs';
import * as path from 'path';

import { CosmosDB, Param } from '../lib/cosmosDB';
import { error, info } from '../lib/logger';

import * as paths from '../config/scriptConfig.json';
import * as config from '../config/dbConfig.json';

function dirCleanUp(path) {
    if (fs.existsSync(path)) fs.rmdirSync(path, { recursive: true });
    info(`Dir cleaned: ${path}`);
}

async function cleanPrj() {
    Object.keys(paths).forEach((sourcePath) => {
        sourcePath.indexOf('Dir') !== -1 ? dirCleanUp(paths[sourcePath]) : dirCleanUp(path.dirname(paths[sourcePath]));
    });

    const dbContext = new CosmosDB(config, config.containerId);

    await dbContext.cleanup(config);
    info(`DB deleted: ${config.databaseId}`);

    await dbContext.createDatabase(config);
    await dbContext.createContainer(config);
    info(`Empty DB Created: ${config.databaseId}`);
}

cleanPrj().catch((err) => error(err.message));
