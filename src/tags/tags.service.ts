import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from './tag.interface';

@Injectable()
export class TagsService {
  private tags: Tag[] = [];
  private readonly logger = new Logger(TagsService.name);

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {

      // Establecer valores predeterminados para campos opcionales
      const tag: Tag = {
        id: uuidv4(),

        createdAt: new Date(),
        updatedAt: new Date(),
        ...createTagDto,
      };

      this.tags.push(tag);
      this.logger.log(`Tag creado con id: ${tag.id}`);
      return tag;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(): Promise<Tag[]> {
    try {
      if (this.tags.length === 0) {
        throw new NotFoundException('No se encontraron tags disponibles');
      }
      return this.tags;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async findOne(id: string): Promise<Tag> {
    try {
      const tag = this.tags.find((tag) => tag.id === id);
      if (!tag) {
        throw new NotFoundException(`El tag con id ${id} no fue encontrado`);
      }
      return tag;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  //obtener todos los tags por slug
  async findBySlug(slug: string): Promise<Tag[]> {
    try {
      const tags = this.tags.filter((tag) => tag.slug === slug);
      if (tags.length === 0) {
        throw new NotFoundException(`No se encontraron tags con el slug ${slug}`);
      }
      return tags;
    } catch (error) {
      this.handleErrors(error);
    }
  }


  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    try {
      const tagIndex = this.tags.findIndex((tag) => tag.id === id);
      if (tagIndex === -1) {
        throw new NotFoundException(`El tag con id ${id} no fue encontrado`);
      }

      // Verificar si ya existe otro tag con el mismo slug
      if (updateTagDto.slug) {
        const slugExists = this.tags.some(
          (tag, index) => tag.slug === updateTagDto.slug && index !== tagIndex
        );
        if (slugExists) {
          throw new ConflictException(`Ya existe otro tag con el slug: ${updateTagDto.slug}`);
        }
      }

      const updatedTag = {
        ...this.tags[tagIndex],
        ...updateTagDto,
        updatedAt: new Date()
      };

      this.tags[tagIndex] = updatedTag;
      this.logger.log(`Tag actualizado con id: ${id}`);
      return updatedTag;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async replace(id: string, newTagDto: CreateTagDto): Promise<Tag> {
    try {
      const tagIndex = this.tags.findIndex((tag) => tag.id === id);
      if (tagIndex === -1) {
        throw new NotFoundException(`El tag con id ${id} no fue encontrado`);
      }

      // Verificar si ya existe otro tag con el mismo slug
      if (newTagDto.slug) {
        const slugExists = this.tags.some(
          (tag, index) => tag.slug === newTagDto.slug && index !== tagIndex
        );
        if (slugExists) {
          throw new ConflictException(`Ya existe otro tag con el slug: ${newTagDto.slug}`);
        }
      }

      const newTag: Tag = {
        id,
        createdAt: this.tags[tagIndex].createdAt,
        updatedAt: new Date(),
        ...newTagDto,
      };

      this.tags[tagIndex] = newTag;
      this.logger.log(`Tag reemplazado con id: ${id}`);
      return newTag;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string): Promise<Tag> {
    try {
      const tagIndex = this.tags.findIndex((tag) => tag.id === id);
      if (tagIndex === -1) {
        throw new NotFoundException(`El tag con id ${id} no fue encontrado`);
      }

      const removedTag = this.tags[tagIndex];
      this.tags.splice(tagIndex, 1);
      this.logger.log(`Tag eliminado con id: ${id}`);
      return removedTag;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  

  // Centralizar el manejo de errores
  private handleErrors(error: any): never {
    if (
      error instanceof NotFoundException ||
      error instanceof BadRequestException ||
      error instanceof ConflictException
    ) {
      this.logger.warn(error.message);
      throw error;
    }

    this.logger.error(`Error inesperado: ${error.message}`, error.stack);
    throw new InternalServerErrorException('Ocurrió un error inesperado, por favor contacte al administrador');
  }
}