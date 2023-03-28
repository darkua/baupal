// Define validation rules for the request body
import { body, param } from 'express-validator'

export const submitFormValidationRules = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('fields').not().isEmpty().withMessage('Fields is required')
]

export const getFormValidationsRules = [
  param('id').isInt().withMessage('Invalid ID format')
]
