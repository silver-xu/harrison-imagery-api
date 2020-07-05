import { Express } from 'express';

import { addImageRoutes } from './image';

export const addSecureRoutes = (app: Express): Express => {
  addImageRoutes(app);

  return app;
};
