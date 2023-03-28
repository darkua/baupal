import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class createFormTable1631818749527 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE form (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        fields JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE form')
  }
}
