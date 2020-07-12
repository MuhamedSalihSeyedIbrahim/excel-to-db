import { AppModel } from './model';

import * as XLSX from 'xlsx';

/**
 * Application Service.
 */
class AppService {
    private appModel: AppModel;

    /**
     * Constructor.
     */
    constructor() {
        this.appModel = new AppModel();
    }

    /**
     * Parse Excel and return array of flat object.
     */
    async parseExcel(filePath: string, schema: any): Promise<Array<any>> {
        const workBook: XLSX.WorkBook = XLSX.readFile(filePath),
            sheetName: string = workBook.SheetNames[0],
            schemaMappedexcelRows: Array<unknown> = XLSX.utils
                .sheet_to_json(workBook.Sheets[sheetName], {
                    defval: '',
                    raw: true,
                })
                ?.map((row) => schema(row));

        return schemaMappedexcelRows;
    }

    /**
     * Service caller to model for intiation save all.
     */
    async saveAllRecords(records: Array<any>): Promise<Array<any>> {
        return this.appModel.saveAllRecords(records);
    }
}

export { AppService };
