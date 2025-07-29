import {Expose} from 'class-transformer'

export class ResponseLoginDto {

  @Expose()
  id: number

  @Expose()
  username: string;
}