import { generateSlug } from 'src/_utils/slugify';
import { AfterUpdate, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[]

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @AfterUpdate()
  @BeforeInsert()
  createSlug() {
    this.slug = generateSlug(this.name + ' ' +new Date().getTime())
  }
}
