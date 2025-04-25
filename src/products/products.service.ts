import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/products/entity/products.entity'; // 👈 Cambio aquí
import { User } from 'src/user/users.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) // 👈 Cambio aquí
    private productRepository: Repository<ProductEntity>, // 👈 Cambio aquí

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<ProductEntity[]> { // 👈 Cambio aquí
    return await this.productRepository.find({ relations: ['user'] });
  }

  async getId(id: number): Promise<ProductEntity> { // 👈 Cambio aquí
    const product = await this.productRepository.findOne({ where: { id }, relations: ['user'] });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  async insert(data: { name: string; description: string; userId: number }): Promise<ProductEntity> { // 👈 Cambio aquí
    const user = await this.userRepository.findOne({ where: { id: data.userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${data.userId} no encontrado`);
    }

    const product = this.productRepository.create({
      name: data.name,
      description: data.description,
      user,
    });

    return await this.productRepository.save(product);
  }

  async update(id: number, data: Partial<ProductEntity>): Promise<ProductEntity> { // 👈 Cambio aquí
    const product = await this.getId(id);
    Object.assign(product, data);
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    const product = await this.getId(id);
    await this.productRepository.remove(product);
  }
}
