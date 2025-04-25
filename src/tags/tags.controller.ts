import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  // Crear un nuevo tag
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() body: CreateTagDto): Promise<CreateTagDto> {
    return this.tagsService.create(body);
  }

  // Obtener todos los tags
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  // Obtener un tag por su ID
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tagsService.findOne(id);
  }

  // Obtener un tag por su slug
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.tagsService.findBySlug(slug);
  }


  // Actualización parcial (PATCH)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  // Nueva actualización completa (PUT)
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  replace(@Param('id', new ParseUUIDPipe()) id: string, @Body() newTagDto: CreateTagDto) {
    return this.tagsService.replace(id, newTagDto);
  }


  // Eliminar un tag
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tagsService.remove(id);
  }
}
