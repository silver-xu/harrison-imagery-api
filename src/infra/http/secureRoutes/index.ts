import { Express } from 'express';

import { addImageRoutes } from './image';
import { addLabelRoutes } from './label';

export const addSecureRoutes = (app: Express): Express => {
  addImageRoutes(app);
  addLabelRoutes(app);

  return app;
};
