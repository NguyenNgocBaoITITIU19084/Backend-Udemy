import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';

import * as bcrypt from 'bcrypt';

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