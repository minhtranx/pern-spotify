import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';

import config from '../config/config';
import logger from '../config/logger';
import app from './express';

export const createServer = () => {
	let server;
	let isProduction = config.NODE_ENV === 'production' ? true : false;
	if (isProduction) {
		// Start HTTPS server with SSL Keys
		server = https.createServer(
			{
				key: fs.readFileSync(path.join(__dirname, '../keys/privateKey.key')),
				cert: fs.readFileSync(path.join(__dirname, '../keys/certificate.crt'))
			},
			app
		);
	} else {
		// Start HTTP server
		server = http.createServer(app);
	}
	return server;
};

export const startServer = server => {
	try {
		server.listen(config.PORT, () => {
			logger.info(`Server is listening on port: ${config.PORT}`);
		});
	} catch (error) {
		logger.error(`Unable to start server: ${error}`);
	} finally {
		return server;
	}
};

export const stopServer = server => {
	try {
		server.close();
		logger.info(`Server has been stopped.`);
	} catch (error) {
		logger.error(`Unable to stop server: ${error}`);
	}
};
