import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { User } from "src/user/entities/user.entity";
import { Permission } from "src/permission/entities/permission.entity";

@Entity()
export class Role {
  @PrimaryColumn()
  name: string

  @Column()
  description: string

  @Column({ default: true})
  isActive: boolean

  @OneToMany(() => User, (user) => user.role)
  users: User[]
  
  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[]

  @CreateDateColumn()
  createdAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
