import { Controller, Post } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeDto } from '../size/dto/size.dto/size.dto';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post('group')
  groupSizes(sizes: SizeDto[]) {
    return this.sizeService.groupSizes(sizes); // Utiliza el servicio para agrupar tamaños
  }
}
