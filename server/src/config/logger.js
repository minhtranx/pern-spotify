import appRoot from 'app-root-path';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import config from './config';

const { DailyRotateFile, Console } = transports;
const { combine, label, json, timestamp, prettyPrint, colorize, printf } = format;
const logLabel = `${config.PACKAGE_NAME}`;

const options = {
	file: {
		datePattern: 'YYYY-MM-DD',
		filename: `${appRoot}/logs/${config.PACKAGE_NAME}-%DATE%.log`,
		format: combine(
			label({ label: logLabel }),
			json(),
			timestamp({
				format: 'YYYY-MM-DD HH:mm:ss'
			}),
			prettyPrint()
		),
		handleExceptions: true,
		humanReadableUnhandledException: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false
	},
	console: {
		format: combine(
			label({ label: logLabel }),
			colorize(),
			timestamp({
				format: 'YYYY-MM-DD HH:mm:ss'
			}),
			printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`)
		),
		handleExceptions: true,
		json: false,
		colorize: true
	}
};

/**
 * Usage
 * import logger from './config/logger';
 * logger.info('INFO');
 * logger.debug('DEBUG');
 * logger.warn('WARN');
 * logger.error('ERROR');
 */
const logger = new createLogger({
	// change level if in dev environment versus production
	level: config.NODE_ENV === 'production' ? 'info' : 'debug',
	transports: [new DailyRotateFile(options.file), new Console(options.console)],
	exitOnError: false // do not exit on handled exceptions
});

export default logger;
