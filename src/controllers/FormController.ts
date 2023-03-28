import { type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import FormService from '../services/FormService'

export default class FormController {
  public async createForm (req: Request, res: Response): Promise<void> {
    try {
      // validate data
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      // Extract the required fields from the request body
      const { name, fields } = req.body

      const form = await new FormService().save(name, fields)

      // Return a success response to the client
      res.status(201).json({
        message: 'Form data saved successfully',
        data: form
      })
    } catch (err) {
      // Handle any errors that occur during the request
      console.error(err)
      res.status(500).json({
        message: 'An error occurred while saving the form data'
      })
    }
  }

  public async getFormById (req: Request, res: Response): Promise<void> {
    try {
      // validate data
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
      }
      const { id } = req.params
      const form = await new FormService().get(parseInt(id))
      // If the form doesn't exist, return a 404 error
      if (form == null) {
        res.status(404).json({ message: 'Form not found' })
        return
      }

      // If the form exists, return it
      res.status(200).json(form)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
