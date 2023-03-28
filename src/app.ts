import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Router from './routes'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import path from 'path'

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API to retrieve and submit forms',
      version: '1.0.0'
    },
    schemes: ['http'],
    servers: [{ url: 'http://localhost:3000/' }]
  },
  apis: [
    path.join(__dirname, '/routes.ts')
  ]
}
const swaggerSpec = swaggerJSDoc(options)

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(Router)

export default app
