import { Express } from 'express';

export const addImageRoutes = (app: Express): Express => {
  app.get('/image/:id', (req, res, next) => {
    try {
      const id = req.params['id'];
      res.send(id);
    } catch (error) {
      next(error);
    }
  });

  return app;
};
