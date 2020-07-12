import { AppService } from './service';
import * as _ from 'underscore';
import * as fs from 'fs';

import { filePath, fileChunkLimit } from '../config/config.json';
import { schema } from './schema/schema';

/**
 * Application handler.
 */
class AppController {
    /**
     * excelToDb handler.
     */
    async excelToDb() {
        //Service call.
        const appService: AppService = new AppService(),
            parsedExcelData: Array<any> = await appService.parseExcel(filePath, schema),
            //chunk wise save all record (promise method)
            excelDataChunkArrayStatus: Array<Promise<any>> = _.chunk(
                parsedExcelData,
                fileChunkLimit,
            )?.map(async (chunk: Array<any>) => appService.saveAllRecords(chunk));

        //flatten promise console response to console and log
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
    }
}
export { AppController };
