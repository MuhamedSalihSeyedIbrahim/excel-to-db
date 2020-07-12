import { AppModel } from './model';

import * as XLSX from 'xlsx';

class AppService {
    private appModel: AppModel;

    constructor() {
        this.appModel = new AppModel();
    }

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

    async saveAllRecords(records: Array<any>): Promise<Array<any>> {
        return this.appModel.saveAllRecords(records);
    }
}

export { AppService };
