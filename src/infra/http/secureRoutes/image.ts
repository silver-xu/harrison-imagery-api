import { Express } from 'express';

import {
  addImageController,
  deleteImageController,
  getImageController,
  updateImageController,
} from '../controllers/image';

export const addImageRoutes = (app: Express): Express => {
  /**
   * @swagger
   * /v1/image/{id}:
   *    get:
   *      tags:
   *        - Image
   *      summary: Returns an image from Harrison.ai system
   *      consumes:
   *        - application/json*
   *      parameters:
   *        - name: id
   *          description: image id
   *          in: path
   *          required: true
   *          type: number
   *        - name: x-auth
   *          description: authorization header
   *          in: header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: Deserialized image object
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        404:
   *          description: Image does not exist
   *        500:
   *          description: Internal Error
   */
  app.get('/v1/image/:id', (req, res, next) => {
    getImageController(req, res, next);
  });

  /**
   * @swagger
   * /v1/image/:
   *    post:
   *      tags:
   *        - Image
   *      summary: Creating an image in Harrison.ai system
   *      consumes:
   *        - application/json*
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                imagePath:
   *                  type: string
   *                width:
   *                  type: number
   *                height:
   *                  type: number
   *      parameters:
   *        - name: x-auth
   *          description: authorization header
   *          in: header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: image created
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        500:
   *          description: Internal Error
   */
  app.post('/v1/image', (req, res, next) => {
    addImageController(req, res, next);
  });

  /**
   * @swagger
   * /v1/image/{id}:
   *    put:
   *      tags:
   *        - Image
   *      summary: Updating an image in Harrison.ai system
   *      consumes:
   *        - application/json*
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                imagePath:
   *                 type: string
   *                width:
   *                 type: number
   *                height:
   *                 type: number
   *                statusCode:
   *                  type: string
   *                  enum:
   *                    - Created
   *                    - Labelled
   *                    - Deleted
   *      parameters:
   *        - name: id
   *          description: image id
   *          in: path
   *          required: true
   *          type: number
   *        - name: x-auth
   *          description: authorization header
   *          in: header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: Ok
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        404:
   *          description: Image does not exist
   *        500:
   *          description: Internal Error
   */
  app.put('/v1/image/:id', (req, res, next) => {
    updateImageController(req, res, next);
  });

  /**
   * @swagger
   * /v1/image/{id}:
   *    delete:
   *      tags:
   *        - Image
   *      summary: Deletes an image from Harrison.ai system
   *      consumes:
   *        - application/json*
   *      parameters:
   *        - name: id
   *          description: image id
   *          in: path
   *          required: true
   *          type: number
   *        - name: x-auth
   *          description: authorization header
   *          in: header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: Deserialized image object
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        404:
   *          description: Image does not exist
   *        500:
   *          description: Internal Error
   */
  app.delete('/v1/image/:id', (req, res, next) => {
    deleteImageController(req, res, next);
  });

  return app;
};
