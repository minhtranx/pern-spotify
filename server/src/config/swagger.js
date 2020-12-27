import config from './config';

export const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: `${config.PACKAGE_NAME} API documentation`,
		version: config.PACKAGE_VERSION,
		license: {
			name: 'MIT',
			url: 'https://github.com/minhtranx/pern-spotify/blob/main/LICENSE'
		}
	},
	servers: [
		{
			url: `http://localhost:${config.PORT}/api/v1`
		}
	]
};
