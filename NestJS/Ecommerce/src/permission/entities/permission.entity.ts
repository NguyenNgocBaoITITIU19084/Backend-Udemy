import { Endpoint } from "src/endpoint/entities/endpoint.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role_name: string

  @Column()
  endpoint_id: number

  @ManyToOne(()=> Role, (role) => role.permissions)
  @JoinColumn({name: 'role_name'})
  role: Role

  @ManyToOne(() => Endpoint, (endpoint) => endpoint.permissions)
  @JoinColumn({name: 'endpoint_id'})
  endpoint: Endpoint

  @Column({ default: false})
  isAllow: boolean
}
