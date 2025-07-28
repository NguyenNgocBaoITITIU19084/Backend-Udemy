import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from 'typeorm';
import { Report } from '../report/report.entity'
@Entity()
export class Users {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Report, (report) => report.user)
  report: Report[]

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id', this);
  }

}