import { Express } from 'express';

import { listLabelsController } from '../controllers/image/listLabelsController';
import {
  addLabelController,
  deleteLabelController,
  getLabelController,
  updateLabelController,
} from '../controllers/label';

export const addLabelRoutes = (app: Express): Express => {
  /**
   * @swagger
   * /v1/label/{id}:
   *    get:
   *      tags:
   *        - Label
   *      summary: Returns a label from Harrison.ai system
   *      consumes:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: label id
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
  app.get('/v1/label/:id', (req, res, next) => {
    getLabelController(req, res, next);
  });

  /**
   * @swagger
   * /v1/labels:
   *    get:
   *      tags:
   *        - Label
   *      summary: Returns all labels from Harrison.ai system
   *      consumes:
   *        - application/json
   *      parameters:
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
  app.get('/v1/labels', (req, res, next) => {
    listLabelsController(req, res, next);
  });

  /**
   * @swagger
   * /v1/label/:
   *    post:
   *      tags:
   *        - Label
   *      summary: Creating a label in Harrison.ai system
   *      consumes:
   *        - application/json
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                label:
   *                  type: string
   *      parameters:
   *        - name: x-auth
   *          description: authorization header
   *          in: header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: Label created
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        500:
   *          description: Internal Error
   */
  app.post('/v1/label', (req, res, next) => {
    addLabelController(req, res, next);
  });

  /**
   * @swagger
   * /v1/label/{id}:
   *    put:
   *      tags:
   *        - Label
   *      summary: Updating a label in Harrison.ai system
   *      consumes:
   *        - application/json
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                label:
   *                  type: string
   *                statusCode:
   *                  type: string
   *                  enum:
   *                    - InUse
   *                    - Deleted
   *      parameters:
   *        - name: id
   *          description: label id
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
   *          description: Updated label
   *        400:
   *          description: Unauthorized access
   *        401:
   *          description: Bad Request
   *        404:
   *          description: Label does not exist
   *        500:
   *          description: Internal Error
   */
  app.put('/v1/label/:id', (req, res, next) => {
    updateLabelController(req, res, next);
  });

  /**
   * @swagger
   * /v1/label/{id}:
   *    delete:
   *      tags:
   *        - Label
   *      summary: Deletes a label from Harrison.ai system
   *      consumes:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: label id
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
  app.delete('/v1/label/:id', (req, res, next) => {
    deleteLabelController(req, res, next);
  });

  return app;
};
