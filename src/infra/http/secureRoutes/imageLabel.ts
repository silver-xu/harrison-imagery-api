import { Express } from 'express';

import { addImageLabelController, deleteImageLabelController } from '../controllers/imageLabel';
import { getImageLabellingController } from '../controllers/imageLabel/getImageLabellingController';
import { getLabelledImagesController } from '../controllers/imageLabel/getLabelledImagesController';

export const addImageLabelRoutes = (app: Express): Express => {
  /**
   * @swagger
   * /v1/image/{id}/label:
   *    get:
   *      tags:
   *        - Image Label
   *      summary: Returns all labels assigned to an image from Harrison.ai system
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
   *          description: Deserialized image labelling object
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        404:
   *          description: Image does not exist
   *        500:
   *          description: Internal Error
   */
  app.get('/v1/image/:id/label', (req, res, next) => {
    getImageLabellingController(req, res, next);
  });

  /**
   * @swagger
   * /v1/label/{id}/image:
   *    get:
   *      tags:
   *        - Image Label
   *      summary: Returns all images the label assigned to from Harrison.ai system
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
   *          description: Deserialized images object with labelling position
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        404:
   *          description: Label does not exist
   *        500:
   *          description: Internal Error
   */
  app.get('/v1/label/:id/image', (req, res, next) => {
    getLabelledImagesController(req, res, next);
  });

  /**
   * @swagger
   * /v1/image-label:
   *    post:
   *      tags:
   *        - Image Label
   *      summary: Adding an image label in Harrison.ai system
   *      consumes:
   *        - application/json*
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                imageId:
   *                  type: number
   *                labelId:
   *                  type: number
   *                x:
   *                  type: number
   *                y:
   *                  type: number
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
   *          description: Image label created
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        500:
   *          description: Internal Error
   */
  app.post('/v1/image-label', (req, res, next) => {
    addImageLabelController(req, res, next);
  });

  /**
   * @swagger
   * /v1/label-label/{id}:
   *    delete:
   *      tags:
   *        - Image Label
   *      summary: Deletes an image label from Harrison.ai system
   *      consumes:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: image label id
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
   *          description: Deserialized label object
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        404:
   *          description: Label does not exist
   *        500:
   *          description: Internal Error
   */
  app.delete('/v1/image-label/:id', (req, res, next) => {
    deleteImageLabelController(req, res, next);
  });

  return app;
};
