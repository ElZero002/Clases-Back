import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from 'src/products/entity/products.entity';  // ✅ Cambiado a ProductEntity
import { UsersService } from 'src/user/user.service';  // Importamos el UsersService para la relación con User
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    @InjectRepository(ProductEntity) // ✅ Cambio aquí
    private productRepository: Repository<ProductEntity>, // ✅ Cambio aquí
  ) {}

  @Get()
  getAllProducts(): Promise<ProductEntity[]> { // ✅ Cambio aquí
    return this.productsService.getAll();
  }

  @Post()
  @HttpCode(201)
  async createProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('userId') userId: number,
  ) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const product = this.productRepository.create({
      name,
      description,
      user,
    });

    return this.productRepository.save(product);
  }

  @Get(':id')
  async find(@Res() response, @Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.getId(id);

    if (product) {
      return response.status(HttpStatus.OK).send(`Página del producto: ${id}`);
    } else {
      return response.status(HttpStatus.NOT_FOUND).send(`Producto inexistente`);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { name: string; description: string },
  ) {
    return this.productsService.update(id, body);
  }

  @Patch(':id')
  async partialUpdate(@Param('id') id: number, @Body() body) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
