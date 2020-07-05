import { Express } from 'express';

export const addHealthRoutes = (app: Express): void => {
  app.get('/health', (_req, res) => {
    res.send('Ok');
  });
};
