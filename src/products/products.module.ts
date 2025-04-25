import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './entity/products.entity'; // ✅ Cambio aquí
import { User } from 'src/user/users.entity'; // Asegúrate que sea la entidad correcta
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, User]), // ✅ Cambio aquí
    UsersModule // ¡Esto ya funcionará bien!
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
