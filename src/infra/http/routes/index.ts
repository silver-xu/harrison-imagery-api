import { Express } from 'express';

import { addHealthRoutes } from './health';
import { addSwaggerRoutes } from './swagger';

export const addInsecureRoutes = (app: Express): Express => {
  addHealthRoutes(app);
  addSwaggerRoutes(app);

  return app;
};
