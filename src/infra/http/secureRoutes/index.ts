import { Express } from 'express';

import { addImageRoutes } from './image';
import { addImageLabelRoutes } from './imageLabel';
import { addLabelRoutes } from './label';

export const addSecureRoutes = (app: Express): Express => {
  addImageLabelRoutes(app);
  addImageRoutes(app);
  addLabelRoutes(app);

  return app;
};
