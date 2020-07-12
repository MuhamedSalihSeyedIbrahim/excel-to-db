import { info, error } from '../lib/logger';

import { AppController } from './handle';

/**
 * Initial application call.
 */
function main() {
    const appController: AppController = new AppController();
    const appStartTime = Date.now();
    console.time();
    info(`Application Excel to CosmosDB Started : ${Date.now() / (1000 * 60)}.`);

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
}

//intial application start call
main();
