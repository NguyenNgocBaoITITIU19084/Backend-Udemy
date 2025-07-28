import { Expose } from "class-transformer";

export class ResponseUserDTO {
  @Expose()
  email: string;

  @Expose()
  password: string;
}