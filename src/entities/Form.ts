import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('form')
export class Form {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id!: number

  @Column('varchar', { name: 'name', nullable: false, length: 255 })
    name!: string

  @Column('jsonb', { nullable: false, default: {} })
    fields!: object
}
