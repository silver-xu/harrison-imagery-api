import { Express } from 'express';
import * as swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from '../swagger';

export const addSwaggerRoutes = (app: Express): void => {
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
