import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UsersService } from 'src/user/user.service';
import { Product } from './entity/products.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        UsersService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const userId = 1;
    const name = 'Vela aromática';
    const description = 'Vela con olor a rosas';

    const mockUser = {
      id: userId,
      name: 'User1',
      last_name: 'Test',
      email: 'user1@example.com',
      birthday: '1990-01-01',
      identification: '1234567890',
      products: [],
    };

    const result = {
      id: 1,
      name,
      description,
      user: mockUser,
    };

    jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser as any);
    jest.spyOn(productsService, 'insert').mockResolvedValue(result as any);

    const response = await controller.createProduct(name, description, userId);
    expect(response).toEqual(result);
  });

  it('should return all products', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Vela aromática',
        description: 'Vela con olor a rosas',
        user: { id: 1, name: 'User1' },
      },
      {
        id: 2,
        name: 'Marco de fotos',
        description: 'Marco ideal para fotos 10x15',
        user: { id: 2, name: 'User2' },
      },
    ];

    jest.spyOn(productsService, 'getAll').mockResolvedValue(mockProducts as any);

    const result = await controller.getAllProducts();
    expect(result).toEqual(mockProducts);
  });
});
