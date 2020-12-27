import config from './config/config';
import logger from './config/logger';
import { createServer, startServer, stopServer } from './services/server';
logger.info(`Server running on ${config.NODE_ENV.toUpperCase()} mode.`);

let server;
server = createServer();
if (server) {
	server = startServer(server);
	// setTimeout(() => {
	// 	stopServer(server);
	// }, 5000);
}

process.on('uncaughtException', error => {
	logger.error(`uncaughtException: ${error}`);
	if (server) stopServer(server);
	process.exit(1);
});
process.on('unhandledRejection', error => {
	logger.error(`unhandledRejection: ${error}`);
	if (server) stopServer(server);
	process.exit(1);
});

process.on('SIGINT', () => {
	logger.info(`SIGINT Graceful Shutdown ${new Date().toISOString()}`);
	if (server) stopServer(server);
});

process.on('SIGTERM', () => {
	logger.info(`SIGTERM Graceful Shutdown ${new Date().toISOString()}`);
	if (server) stopServer(server);
});
