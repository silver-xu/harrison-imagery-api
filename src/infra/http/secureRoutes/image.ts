import { Express } from 'express';

import {
  addImageController,
  deleteImageController,
  getImageController,
  updateImageController,
} from '../controllers/image';

export const addImageRoutes = (app: Express): Express => {
  app.get('/image/:id', (req, res, next) => {
    getImageController(req, res, next);
  });

  app.post('/image', (req, res, next) => {
    addImageController(req, res, next);
  });

  app.put('/image/:id', (req, res, next) => {
    updateImageController(req, res, next);
  });

  app.delete('/image/:id', (req, res, next) => {
    deleteImageController(req, res, next);
  });

  return app;
};
