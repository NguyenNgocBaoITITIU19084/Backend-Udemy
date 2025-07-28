import {Expose} from 'class-transformer'

export class ResponseReportDto {
  @Expose()
  price: number

  @Expose()
  make: string;

  @Expose()
  model: string; 
  
  @Expose()
  year: number;

  @Expose()
  mileage: number;
  
  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  userId: number
}