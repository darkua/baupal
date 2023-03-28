/* eslint-disable @typescript-eslint/no-misused-promises */
// https://github.com/express-promise-router/express-promise-router/issues/230

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import FormController from './controllers/FormController'
import { submitFormValidationRules, getFormValidationsRules } from './validators/FormValidator'
const router = express.Router()

router.get(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
)

/**
 * @swagger
 * /form:
 *   post:
 *     summary: Create a new form
 *     description: Create a new form with the specified name and fields
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               fields:
 *                 type: object
 *                 properties:
 *                   field1:
 *                     type: string
 *                   field2:
 *                     type: string
 *                   field3:
 *                     type: string
 *             required:
 *               - name
 *               - fields
 *     responses:
 *       200:
 *         description: Form created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 fields:
 *                   type: object
 *                   properties:
 *                     field1:
 *                       type: string
 *                     field2:
 *                       type: string
 *                     field3:
 *                       type: string
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Error'
 *
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          example: Name is Required!
 *        param:
 *          type: string
 *          example: name
 *        location:
 *          type: string
 *          example: body
 */
router.post('/form', submitFormValidationRules, new FormController().createForm)

/**
 * @swagger
 * /form/{id}:
 *   get:
 *     summary: Get form by ID
 *     description: Retrieve a single form by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the form to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single form object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Form'
 *       404:
 *         description: Form not found
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid ID format
 * components:
 *  schemas:
 *    Form:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        name:
 *          type: string
 *          example: Contact Form
 *        fields:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              example: John Doe
 *            email:
 *              type: string
 *              example: john.doe@example.com
 *            message:
 *              type: string
 *              example: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
router.get('/form/:id', getFormValidationsRules, new FormController().getFormById)
export default router
