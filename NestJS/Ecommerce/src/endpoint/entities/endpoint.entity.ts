import { Permission } from 'src/permission/entities/permission.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

export enum HttpMethod {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  GET = 'GET'
}

@Entity()
export class Endpoint {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @Column({ type: "enum",  enum: HttpMethod,  default: HttpMethod.POST })
  method: HttpMethod

  @OneToMany(() => Permission, (permission) => permission.endpoint)
  permissions: Permission[]
}
