import app from './app'
import request from 'supertest'
import { type Form } from './entities/Form'

describe('POST /form', () => {
  it('should create a new form when given a valid name and fields', async () => {
    const form = {
      name: 'Test Form',
      fields: {
        name: {
          label: 'Name',
          type: 'text',
          required: true
        },
        email: {
          label: 'Email',
          type: 'email',
          required: true
        }
      }
    }

    const response = await request(app).post('/form').send(form)
    expect(response.status).toBe(201)
    expect(response.body.data).toMatchObject({
      id: expect.any(Number),
      name: 'Test Form',
      fields: {
        name: {
          label: 'Name',
          type: 'text',
          required: true
        },
        email: {
          label: 'Email',
          type: 'email',
          required: true
        }
      }
    })
  })

  it('should return a 422 error when the name field is missing', async () => {
    const form = {
      fields: {
        name: {
          label: 'Name',
          type: 'text',
          required: true
        },
        email: {
          label: 'Email',
          type: 'email',
          required: true
        }
      }
    }

    const response = await request(app).post('/form').send(form)

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toContainEqual({
      value: undefined,
      msg: 'Name is required',
      param: 'name',
      location: 'body'
    })
  })

  it('should return a 422 error when the fields field is missing', async () => {
    const form = {
      name: 'Test Form'
    }

    const response = await request(app).post('/form').send(form)

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toContainEqual({
      value: undefined,
      msg: 'Fields is required',
      param: 'fields',
      location: 'body'
    })
  })
})

describe('GET /form/:id', () => {
  it('should return the form with the given id', async () => {
    // create a new form in the database
    const formRequest = {
      name: 'FooBar',
      fields: {
        email: 'foo@bar.com'
      }
    }
    const formResponse = await request(app).post('/form').send(formRequest)
    expect(formResponse.status).toBe(201)
    // form id
    const form: Form = formResponse.body.data
    // send a GET request to the API for the created form
    const response = await request(app).get(`/form/${form.id}`)
    // check that the response status is 200 OK
    expect(response.status).toBe(200)

    // check that the response body contains the expected form data
    expect(response.body.id).toBe(form.id)
    expect(response.body.name).toBe(form.name)
    expect(response.body.fields).toEqual(form.fields)
  })

  it('should return a 400 Bad Request error if the id is not a number', async () => {
    // send a GET request to the API with a non-numeric id parameter
    const response = await request(app).get('/form/invalid')

    // check that the response status is 400 Bad Request
    expect(response.status).toBe(400)
    console.log('response.body', response.body)
    // check that the response body contains an error message
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toContainEqual({
      value: 'invalid',
      msg: 'Invalid ID format',
      param: 'id',
      location: 'params'
    })
  })

  it('should return a 404 Not Found error if no form is found with the given id', async () => {
    // send a GET request to the API with an id parameter for a non-existent form
    const response = await request(app).get('/form/999')

    // check that the response status is 404 Not Found
    expect(response.status).toBe(404)

    // check that the response body contains an error message
    expect(response.body.message).toBe('Form not found')
  })
})
