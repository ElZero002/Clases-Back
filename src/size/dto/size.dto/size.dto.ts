import { IsNotEmpty, IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class SizeDto {
  @IsNotEmpty({ message: 'El nombre de la talla es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], {
    message: 'La talla debe ser una de las siguientes: XS, S, M, L, XL, XXL, XXXL',
  })
  name: string; // Ahora acepta también XXL y XXXL

  @IsOptional()
  @IsNumber({}, { message: 'El valor numérico debe ser un número' })
  value?: number;
}
