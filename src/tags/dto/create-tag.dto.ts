import { Type } from "class-transformer";
import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
  IsPositive,
  IsInt,
  Max,
  
} from "class-validator";

export class CreateTagDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(30, { message: 'El nombre no debe tener más de 30 caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo debe contener letras y espacios',
  })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no debe estar vacía' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
  @MaxLength(100, { message: 'La descripción no debe tener más de 100 caracteres' })
  description: string;

  @IsString({ message: 'El slug debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El slug no debe estar vacío' })
  @MinLength(2, { message: 'El slug debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El slug no debe tener más de 50 caracteres' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'El slug solo puede contener letras minúsculas, números y guiones (ej. ejemplo-de-slug)',
  })
  slug: string;

  @Type(() => Number)
  @IsInt({ message: 'El stock debe ser un número entero' })
  @IsPositive({ message: 'El stock debe ser un número positivo' })
  @Max(99, { message: 'El stock no puede ser mayor a 99' })
  stock: number;
  
}