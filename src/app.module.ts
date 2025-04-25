import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { SizeModule } from './size/size.module';


@Module({
  imports: [
    ProductsModule,
    TagsModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'ghost_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      retryDelay: 3000,
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo
      logging: true,
    }),
    SizeModule,
  ],
  controllers: [AppController], // Solo deja los controladores propios del AppModule
  providers: [AppService], // Solo los providers propios
})
export class AppModule {}
