import { getDataSource } from '../data-source'
import { Form } from '../entities/Form'
import { type FormRepository } from '../repositories/FormRepository'

export default class FormService {
  public async save (name: string, fields: object): Promise<Form> {
    // Create a new Form entity
    const form = new Form()
    form.name = name
    form.fields = fields

    // get DB connection
    const ds = await getDataSource()

    // Save the new Form entity to the database
    const formRepository = ds.getRepository(Form) as FormRepository
    await formRepository.save(form)
    return form
  }

  public async get (id: number): Promise<Form | null> {
    // Create a new Form entity
    const form = new Form()
    form.id = id

    // get DB connection
    const ds = await getDataSource()

    // Save the new Form entity to the database
    const formRepository = ds.getRepository(Form) as FormRepository
    return await formRepository.findOne({ where: { id } })
  }
}
