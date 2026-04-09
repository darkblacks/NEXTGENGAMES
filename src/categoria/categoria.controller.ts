import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';

@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria | null> {
    return this.categoriaService.findById(id);
  }

  @Get('/nome/:nome')
  findByNome(@Param('nome') nome: string): Promise<Categoria[]> {
    return this.categoriaService.findByNome(nome);
  }

  @Post()
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put()
  update(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
  }

  @HttpCode(204)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriaService.delete(id);
  }
}