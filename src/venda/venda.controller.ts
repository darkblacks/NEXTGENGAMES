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
import { Venda } from './venda.entity';
import { VendaService } from './venda.service';

@Controller('/vendas')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Get()
  findAll(): Promise<Venda[]> {
    return this.vendaService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Venda | null> {
    return this.vendaService.findById(id);
  }

  @Post()
  create(@Body() venda: Venda): Promise<Venda> {
    return this.vendaService.create(venda);
  }

  @Put()
  update(@Body() venda: Venda): Promise<Venda> {
    return this.vendaService.update(venda);
  }

  @HttpCode(204)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vendaService.delete(id);
  }
}