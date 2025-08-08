import { Expose } from "class-transformer";
import { Category } from "../entities/category.entity";

export class ResponseCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  slug: string;

  @Expose()
  children: Category[]

  @Expose()
  parent: Category

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}