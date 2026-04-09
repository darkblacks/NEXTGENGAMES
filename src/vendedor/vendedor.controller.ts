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
import { Vendedor } from './vendedor.entity';
import { VendedorService } from './vendedor.service';

@Controller('/vendedores')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @Get()
  findAll(): Promise<Vendedor[]> {
    return this.vendedorService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Vendedor | null> {
    return this.vendedorService.findById(id);
  }

  @Get('/nome/:nome')
  findByNome(@Param('nome') nome: string): Promise<Vendedor[]> {
    return this.vendedorService.findByNome(nome);
  }

  @Post()
  create(@Body() vendedor: Vendedor): Promise<Vendedor> {
    return this.vendedorService.create(vendedor);
  }

  @Put()
  update(@Body() vendedor: Vendedor): Promise<Vendedor> {
    return this.vendedorService.update(vendedor);
  }

  @HttpCode(204)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vendedorService.delete(id);
  }
}