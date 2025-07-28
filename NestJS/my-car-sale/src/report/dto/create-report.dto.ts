import { IsNumber, IsString, IsOptional, Min, Max, IsLatitude, IsLongitude } from 'class-validator';

export class CreateReportDto {
    @IsNumber()
    @Max(1000000)
    @Min(10000)
    price: number 
  
    @IsString()
    make: string;
  
    @IsString()
    model: string;  
  
    @IsNumber()
    @Min(2000)
    @Max(2050)
    year: number;
  
    @IsNumber()
    @Max(1000000)
    mileage: number;
  
    @IsLongitude()
    lng: number;
  
    @IsLatitude()
    lat: number;
}