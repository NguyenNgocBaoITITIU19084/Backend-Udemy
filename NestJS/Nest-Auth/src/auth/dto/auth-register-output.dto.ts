import { Expose } from "class-transformer";

export class AuthRegisterOutputDto {
  @Expose()
  id: number;

  @Expose()
  username: string;
  
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;
  
  @Expose()
  updatedAt: Date;  
}