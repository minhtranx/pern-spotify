import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import lusca from 'lusca';
import xss from 'xss-clean';

// App health libraries
import statusMonitor from 'express-status-monitor';

import config from '../config/config';
import { successHandler, errorHandler } from '../config/morgan';
import { cookieOptions } from '../config/cookie';
import { luscaOptions } from '../config/lusca';

// Custom middlewares & helpers
// import { converter, notFound, handler } from '../../helpers/errorHandler';
// import { rateLimiter } from '../../helpers';
// const passport = require('passport');
// const strategies = require('./passport');

import routesV1 from '../routes/v1';
/**
 * Express instance
 * @public
 */
const app = express();

/**
 * Begin 3rd-party middlewares
 */
// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cookies
app.use(cookieParser(config.COOKIE_SECRET, cookieOptions));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// secure apps by setting various HTTP headers
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

// Enable CSRF protection
app.use(lusca(luscaOptions));

// Prevent XSS attacks
app.use(xss());

// request logging. dev: console | production: file
app.use(successHandler);
app.use(errorHandler);

/**
 * Status Monitor
 * @api {get} status Express Server Status Page
 * @apiDescription Get Express Server Status Page
 * @apiName status
 * @apiGroup General
 * @apiPermission public
 *
 * @apiSuccess {String} OK
 */
app.use(statusMonitor());
/**
 * End 3rd-party middlewares
 */

/**
 * Begin custom middlewares
 */
// enable rate limit
// app.use(rateLimiter());
/**
 * End custom middlewares
 */

// enable authentication
// app.use(passport.initialize());
// passport.use('jwt', strategies.jwt);
// passport.use('facebook', strategies.facebook);
// passport.use('google', strategies.google);

/**
 *  API Docs are available publicly here, not for a specific API version
 * @api {get} docs Express Server Status Page
 * @apiDescription Get Express Server Status Page
 * @apiName docs
 * @apiGroup General
 * @apiPermission public
 *
 * @apiSuccess {String} OK
 */
// app.use('/api/docs', express.static('docs'));

app.use('/api/v1', routesV1);

// if error is not an instanceOf APIError, convert it.
// app.use(converter);

// catch 404 and forward to error handler
// app.use(notFound);

// error handler, send stacktrace only during development
// app.use(handler);

export default app;
