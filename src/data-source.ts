import { DataSource } from 'typeorm'

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'baupal',
  entities: ['src/entities/Form.ts'],
  migrations: ['dist/migrations/*.js'],
  logging: false,
  synchronize: true,
  migrationsRun: true
})

export const getDataSource = async (): Promise<DataSource> => {
  if (!ds.isInitialized) {
    await ds.initialize()
  }
  return ds
}
