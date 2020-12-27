import config from './config';

/**
 * Set options for cookies
 */
export const cookieOptions = {
	maxAge: config.COOKIE_JWT_EXPIRATION_TIME * 60 * 1000, // 15 minutes
	httpOnly: true,
	secure: false //No HTTPS for now
};
