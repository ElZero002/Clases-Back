import { Injectable } from '@nestjs/common';
import { SizeDto } from '../size/dto/size.dto/size.dto';

@Injectable()
export class SizeService {
  groupSizes(sizes: SizeDto[]): { [key: string]: SizeDto[] } {  // Aquí se agrega el tipo de retorno
    return {
      pequeñas: sizes.filter(size => ['S'].includes(size.name)),
      medianas: sizes.filter(size => ['M'].includes(size.name)),
      grandes: sizes.filter(size => ['L', 'XL'].includes(size.name)),
      extragrandes: sizes.filter(size => ['XXL', 'XXXL'].includes(size.name)),
    };
  }
}
