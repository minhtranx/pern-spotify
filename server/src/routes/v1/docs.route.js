import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from '../../config/swagger';

const router = new Router();

const specs = swaggerJsdoc({
	swaggerDefinition,
	apis: ['src/routes/v1/*.js']
});

router.use('/', swaggerUi.serve);
router.get(
	'/',
	swaggerUi.setup(specs, {
		explorer: true
	})
);

export default router;
