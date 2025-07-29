import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string

  @Column()
  password: string
}