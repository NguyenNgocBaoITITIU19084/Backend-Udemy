import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { ROLES } from 'src/auth/enums/roles.enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string

  @Column()
  password: string

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @Column({
    enum: ROLES,
    type: 'enum', 
    default: ROLES.USER
  })
  role: ROLES;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  @CreateDateColumn()
  createdAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}