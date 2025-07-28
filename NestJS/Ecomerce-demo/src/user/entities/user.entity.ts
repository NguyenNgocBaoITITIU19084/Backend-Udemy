import { Entity,Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcryptjs'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if(this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt)
    }
  }
}
