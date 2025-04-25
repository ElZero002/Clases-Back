import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

export class ProductsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(0)
  stock: number;
}
