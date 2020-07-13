import { info, error } from '../lib/logger';

import { AppController } from './handle';

import { writeTofile, InsertInDb } from '../config/config.json';

/**
 * Initial application call.
 */
function main() {
    const appController: AppController = new AppController();
    const appStartTime = Date.now();
    console.time();
    info(`Application Excel to CosmosDB Started : ${Date.now() / (1000 * 60)}.`);

    if (InsertInDb) {
        appController
            .excelToDb()
            .then((_: any) =>
                info(`Application Excel to CosmosDB Process Data: ${(Date.now() - appStartTime) / (1000 * 60)} min.`),
            )
            .catch((_err: Error) => {
                error(`Application Excel to CosmosDB has an Error : ${(Date.now() - appStartTime) / (1000 * 60)} min.`);
            })
            .finally(() => {
                console.timeEnd();
                info(`Application Excel to CosmosDB Stopped : ${(Date.now() - appStartTime) / (1000 * 60)} min.`);
            });

        if (!writeTofile) return;
    }
    if (writeTofile) {
        appController
            .excelToFile()
            .then((_: any) =>
                info(`Application Excel to CosmosDB Process Data: ${(Date.now() - appStartTime) / (1000 * 60)} min.`),
            )
            .catch((_err: Error) => {
                error(`Application Excel to CosmosDB has an Error : ${(Date.now() - appStartTime) / (1000 * 60)} min.`);
            })
            .finally(() => {
                console.timeEnd();
                info(`Application Excel to CosmosDB Stopped : ${(Date.now() - appStartTime) / (1000 * 60)} min.`);
            });
        return;
    }
    error(`Kindly enable either write to file or insert to DB, by setting config values.`);
}

//intial application start call
main();
