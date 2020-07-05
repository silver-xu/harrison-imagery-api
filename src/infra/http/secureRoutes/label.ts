import { Express } from 'express';

import {
  addLabelController,
  deleteLabelController,
  getLabelController,
  updateLabelController,
} from '../controllers/label';

export const addLabelRoutes = (app: Express): Express => {
  app.get('/label/:id', (req, res, next) => {
    getLabelController(req, res, next);
  });

  app.post('/label', (req, res, next) => {
    addLabelController(req, res, next);
  });

  app.put('/label/:id', (req, res, next) => {
    updateLabelController(req, res, next);
  });

  app.delete('/label/:id', (req, res, next) => {
    deleteLabelController(req, res, next);
  });

  return app;
};
