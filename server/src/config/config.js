import pkg from '../../package.json';

/**
 * Wrap variables in a better way:
 * - Default values to prevent adhoc failure
 * - Use this object for intellisense
 */

const config = {
	/**
	 * Export package.json here to reduce imports
	 */
	PACKAGE_NAME: pkg.name || '',
	PACKAGE_VERSION: pkg.version || '1.0.0',
	PACKAGE_DESCRIPTION: pkg.description || '',
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: parseInt(process.env.PORT) || 3000,
	COOKIE_JWT_EXPIRATION_TIME: parseInt(process.env.COOKIE_JWT_EXPIRATION_TIME) || 15
};

export default config;
