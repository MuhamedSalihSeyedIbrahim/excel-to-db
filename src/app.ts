import { AppService } from './service';
import * as _ from 'underscore';
import * as fs from 'fs';

import { filePath, fileChunkLimit } from '../config/config.json';
import { schema } from './schema/schema';

async function app() {
    try {
        const appService: AppService = new AppService(),
            parsedExcelData: Array<any> = await appService.parseExcel(filePath, schema),
            excelDataChunkArrayStatus: Array<Promise<any>> = _.chunk(
                parsedExcelData,
                fileChunkLimit,
            )?.map(async (chunk: Array<any>) => appService.saveAllRecords(chunk));

        const completeStatus = _.flatten(await Promise.all(excelDataChunkArrayStatus), true).map((data) => ({
            id: data?.item?.id,
            status: data?.statusCode,
        }));

        //Status File './reports/status.js'
        fs.writeFileSync(
            './reports/status.ts',
            `
            import { info } from '../lib/logger';

            
            info( 'Data Inserted : ${parsedExcelData.length}');
             info( 'Completed Status :${completeStatus.length}');
             info( '<-------------------------------INSERT DATA STATUS -[{ID ,STATUSCODE }]-------------------------------------->');
             info( JSON.stringify(${JSON.stringify(completeStatus, null, 4)}, null, 4));`,
        );
    } catch (err) {
        throw err;
    }
}

export { app };
