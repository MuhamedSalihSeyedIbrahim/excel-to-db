import * as winston from 'winston';
import { format } from 'winston';

/**
 * Create a new winston logger.
 */
export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: format.combine(format.colorize(), format.timestamp(), format.simple()),
            level: 'info',
        }),

        new winston.transports.File({
            format: format.combine(format.timestamp(), format.simple()),
            filename: './logs/app.log',
            maxsize: 15728640,
            maxFiles: 5,
            handleExceptions: true,
            level: 'info',
        }),
    ],
    handleExceptions: true,
});
logger.exitOnError = false;

/**
 * Function to push info msg.
 *
 * @param {string} msg
 */
export function info(msg: string): void {
    logger.info({ message: msg });
}

/**
 * Function to push error msg.
 *
 * @param {Object} msg
 */
export function error(msg: string): void {
    logger.error({ message: msg });
}
