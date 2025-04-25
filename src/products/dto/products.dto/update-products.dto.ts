import { PartialType } from '@nestjs/mapped-types';
import { ProductsDto } from 'src/products/dto/products.dto/create-products.dto';

export class UpdateProductDto extends PartialType(ProductsDto) {}
