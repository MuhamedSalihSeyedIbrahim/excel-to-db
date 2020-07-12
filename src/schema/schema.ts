import * as moment from 'moment';

const schema = (obj: any): unknown => ({
    sNo: obj['SNO'],
    course: {
        isFree: obj['IS FREE'],
        courseTitle: obj['COURSE TITLE'],
    },
    joindate: ((date: number): string => {
        const parsedDate = moment(new Date((date - (25567 + 1)) * 86400 * 1000), 'YYYY-MM-DD', true);
        if (!parsedDate.isValid()) throw new Error(`Date Parsing Error`);
        return parsedDate.subtract(1, 'days').format('YYYY-MM-DD');
    })(obj['join Date']),
    status: obj['status'],
    score: {
        grade: obj['Grade'],
        precentage: obj['Precentage %'],
    },
    others: ((data: string): any => {
        data = JSON.parse(data?.replace(/'/g, '"'));
        return data;
    })(obj['others']),
});

export { schema };
